<template>
  <div class="w-screen h-screen flex flex-col gap-6 items-center justify-center">
    <div class="flex flex-col gap-2">
      <img
        src="@/assets/images/jim-trollhunters-sword-large.png"
        class="w-[70px] h-[70px] block mx-auto"
        alt="jim-trollhunters-sword"
      />
      <p class="text-[28px] font-semibold text-main">Welcome Hunter</p>
    </div>
    <p class="italic text-sm font-light">*(Please fill forms to finish your registration)*</p>
    <form class="flex flex-col gap-5" method="post" @submit.prevent="onSubmit">
      <div class="flex gap-6">
        <InputComponent
          name="first_name"
          placeholder="First Name *"
          type="text"
          id="first_name"
          input-class="w-full"
          class="flex-1"
          @input="
            setupErrors(
              'first_name',
              RequiredUserInfoSchema.shape.first_name,
              model.user.first_name
            )
          "
          v-model="model.user.first_name"
          :error-message="modelErrors?.first_name"
        />
        <InputComponent
          name="last_name"
          placeholder="Last Name *"
          type="text"
          id="last_name"
          input-class="w-full"
          class="flex-1"
          @input="
            setupErrors('last_name', RequiredUserInfoSchema.shape.last_name, model.user.last_name)
          "
          v-model="model.user.last_name"
          :error-message="modelErrors?.last_name"
        />
      </div>
      <div class="flex gap-6">
        <InputComponent
          name="phone"
          placeholder="Contact Number *"
          type="text"
          id="phone"
          input-class="w-full"
          class="flex-1"
          @input="setupErrors('phone', RequiredUserInfoSchema.shape.phone, model.user.phone)"
          v-model="model.user.phone"
          :error-message="modelErrors?.phone"
        />
        <InputComponent
          name="email"
          placeholder="Email *"
          type="email"
          id="email"
          input-class="w-full"
          class="flex-1"
          @input="setupErrors('email', RequiredUserInfoSchema.shape.email, model.user.email)"
          v-model="model.user.email"
          :disabled="true"
        />
      </div>
      <AddressComponent
        :model-errors="modelErrors"
        @on-change="setupErrors"
        v-model="model.address"
        class="[&>div]:gap-6 flex flex-col gap-5"
      />
      <div class="flex gap-3 justify-center">
        <button type="submit" class="btn w-fit">Finish</button>
        <button type="button" class="btn-outline w-fit" @click="proceed">Skip</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  type UserUpdate,
  UserUpdateSchema,
  AddressSchema,
  validate,
  z,
  ZodSchema,
  type User,
  type ApiResponse,
  type Profile,
  UserType
} from '@shared/pack'
import InputComponent from '../shared/InputComponent.vue'
import AddressComponent from '../shared/AddressComponent.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'

const userUpdate: UserUpdate = {
  id: 0,
  user: {
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  },
  address: {
    address1: '',
    address2: '',
    city: '',
    postal: '',
    province: '',
    country: ''
  }
}

const router = useRouter()
const authStore = useAuthStore()
const authUser = ref<User<Profile> | null>()
const userStore = useUserStore()
const isLoading = defineModel<boolean>()
const modelErrors = ref()
const model = ref<UserUpdate>(userUpdate)

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
  if (authUser.value) {
    model.value.user = authUser.value
    if (authUser.value.profile && authUser.value.profile.address) {
      model.value.address = authUser.value.profile.address
    }
  }
})

const RequiredUserInfoSchema = UserUpdateSchema.extend({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  phone: z.string().min(1, 'Contact number is required')
})

const onSubmit = async () => {
  let hasError = false
  modelErrors.value = modelErrors.value ? modelErrors.value : {}
  const userValRes = validate(RequiredUserInfoSchema, model.value.user)
  const addressValRes = validate(AddressSchema, model.value.address)
  if (!userValRes.valid) {
    modelErrors.value = Object.assign(modelErrors.value, userValRes.errors)
    hasError = true
  }

  if (!addressValRes.valid) {
    modelErrors.value = Object.assign(modelErrors.value, addressValRes.errors)
    hasError = true
  }

  if (hasError) {
    return
  }

  isLoading.value = true
  let res: ApiResponse | null = null
  if (authUser.value) {
    res = await userStore.updateUser(model.value.user, authUser.value.id)
    if (res.status == 200 && authUser.value.profile && authUser.value.profile.address) {
      res = await userStore.updateProfileAddress(
        model.value.address,
        authUser.value.profile.address.id
      )
    }
  }
  isLoading.value = false

  if (res && res.status == 200) {
    proceed()
  }
}

const proceed = () => {
  if (authUser.value) {
    if (authUser.value.type == UserType.HUNTER) {
      router.push({ name: 'hunter' })
    } else if (authUser.value.type == UserType.PROVIDER) {
      router.push({ name: 'provider' })
    }
  }
}

const setupErrors = (field: string, schema: ZodSchema, value: any) => {
  modelErrors.value = modelErrors.value ? modelErrors.value : {}
  const { valid, errors } = validate(schema, value)
  const fieldError: Record<string, string> = {}
  fieldError[field] = !valid ? (errors as string) : ''
  modelErrors.value = Object.assign(modelErrors.value, fieldError)
  return valid
}
</script>
