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
          v-model="model.user.email"
          :error-message="modelErrors?.email"
        />
      </div>
      <InputComponent
        name="prof_summary"
        placeholder="Professional Summary or Objectives *"
        type="textarea"
        id="prof_summary"
        input-class="w-full"
        class="flex-1"
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
  type UserCreation,
  type UserInfoCreation,
  type UserUpdate,
  UserUpdateSchema,
  validate,
  z
} from '@shared/pack'
import InputComponent from '../shared/InputComponent.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user-store'

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
  }
}

const userStore = useUserStore()
const isLoading = defineModel<boolean>()
const modelErrors = ref<Partial<UserInfoCreation>>()
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
  const { errors, valid } = validate(RequiredUserInfoSchema, model.value.user)
  if (!valid) {
    modelErrors.value = errors as UserCreation
    return
  }
  isLoading.value = true
  await userStore.updateUser(model.value)
  isLoading.value = false
}
</script>
