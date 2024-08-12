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
    <div class="flex flex-col gap-5">
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
          name="mobile_number"
          placeholder="Contact Number *"
          type="text"
          id="mobile_number"
          input-class="w-full"
          class="flex-1"
          @input="
            setupErrors(
              'mobile_number',
              RequiredUserInfoSchema.shape.mobile_number,
              model.user.mobile_number
            )
          "
          v-model="model.user.mobile_number"
          :error-message="modelErrors?.mobile_number"
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
          :error-message="modelErrors?.email"
        />
      </div>
      <AddressComponent
        :model-errors="modelErrors"
        @on-change="setupErrors"
        v-model="model.address"
        class="[&>div]:gap-6 flex flex-col gap-5"
      />
      <InputComponent
        name="prof_summary"
        placeholder="Professional Summary or Objectives *"
        type="textarea"
        id="prof_summary"
        input-class="w-full"
        class="flex-1"
        @input="
          setupErrors(
            'professional_summary',
            RequiredUserInfoSchema.shape.professional_summary,
            model.user.professional_summary
          )
        "
        v-model="model.user.professional_summary"
        :error-message="modelErrors?.professional_summary"
        :rows="4"
      />
      <button class="btn w-fit mx-auto" @click="onSubmit">Finish</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type UserUpdate,
  UserUpdateSchema,
  AddressSchema,
  validate,
  z,
  ZodSchema
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
    professional_summary: '',
    mobile_number: ''
  },
  user_registration: {
    is_completed: true
  },
  address: {
    address1: '',
    address2: '',
    city: '',
    postal: ''
  }
}

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const isLoading = defineModel<boolean>()
const modelErrors = ref()
const model = ref<UserUpdate>(userUpdate)

onMounted(() => {
  // setting email
  model.value.id = userStore.user ? userStore.user.id : 0
  model.value.user.email = userStore.user ? userStore.user.email : ''
})

const RequiredUserInfoSchema = UserUpdateSchema.extend({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  mobile_number: z.string().min(1, 'Contact number is required'),
  professional_summary: z.string().min(1, 'Professional Summary is required')
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
  const res = await userStore.updateUser(model.value)
  await authStore.fetchAuthUser(true)
  isLoading.value = false

  if (res.status == 200) {
    router.push({
      name: 'dashboard'
    })
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
