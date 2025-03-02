<template>
  <div class="bg-sub h-screen flex relative">
    <AlertComponent
      :messsage="'Successfully Created'"
      :status="AlertStatus.SUCCESS"
      v-model="showAlert"
      v-if="showAlert"
    />
    <div class="sign-up-wrapper">
      <LoadingComponent v-if="isLoading" />
      <div class="sign-up-inner-wrap">
        <div class="flex flex-col items-center">
          <p class="text-main text-base">Sign up to</p>
          <p class="text-main text-[32px] font-bold">Job Hunt</p>
        </div>
        <div class="flex flex-col gap-5 mt-6">
          <InputComponent
            type="text"
            name="email"
            placeholder="Email *"
            input-class="w-full"
            @input="setupErrors('email', UserCreationSchema.shape.email, model.email)"
            v-model="model.email"
            :error-message="modelErrors.email"
          />
          <InputComponent
            type="text"
            name="username"
            placeholder="Username *"
            input-class="w-full"
            v-model="model.username"
            :error-message="modelErrors.username"
            @input="setupErrors('username', UserCreationSchema.shape.username, model.username)"
          />
          <InputComponent
            type="password"
            name="password"
            placeholder="Password *"
            input-class="w-full"
            v-model="model.password"
            :error-message="modelErrors.password"
            @input="setupErrors('password', UserCreationSchema.shape.password, model.password)"
          />
          <InputComponent
            type="password"
            name="confirm-password"
            placeholder="Confirm password *"
            input-class="w-full"
            v-model="confirmPassword"
            :error-message="confirmPassword != model.password ? 'Password are not identical' : ''"
          />
        </div>
        <button class="btn block mx-auto mt-6 !px-4 !py-2" @click="onSubmit">Sign up</button>
        <div class="flex flex-col gap-4 mt-5">
          <p class="text-main text-base mx-auto">or Sign up with</p>
          <div class="flex gap-2 max-[820px]:flex-col">
            <button class="social-link max-[820px]:justify-center">
              <img src="@/assets/icons/google.svg" alt="google" />
              <p class="text-sm">Google</p>
            </button>
            <button class="social-link max-[820px]:justify-center">
              <img src="@/assets/icons/linkedin.svg" alt="linkedin" />
              <p class="text-sm">LinkedIn</p>
            </button>
            <button class="social-link max-[820px]:justify-center">
              <img src="@/assets/icons/github.svg" alt="github" />
              <p class="text-sm">GitHub</p>
            </button>
          </div>
          <p class="text-main text-base mx-auto">
            Already have an account?
            <RouterLink :to="{ name: 'signin' }" class="text-blue-500 underline">
              Sign in here!
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div class="w-full h-full bg-green-100 flex items-center max-[700px]:hidden">
      <img
        class="w-full h-full object-cover object-left"
        src="@/assets/images/sign-up-cover-photo.png"
        alt="sign-up-cover-photo.png"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user-store'
import LoadingComponent from '@/components/shared/LoadingComponent.vue'
import {
  UserCreationSchema,
  type UserCreation,
  validate,
  ZodSchema,
  AlertStatus
} from '@shared/pack/index'
import InputComponent from '@/components/shared/InputComponent.vue'
import AlertComponent from '@/components/shared/AlertComponent.vue'
import { useRouter } from 'vue-router'

const preSet = {
  email: '',
  password: '',
  username: ''
}

const showAlert = ref<boolean>(false)

const modelErrors = ref<UserCreation>({ ...preSet })
const model = ref<UserCreation>(preSet)
const isLoading = ref<boolean>(false)

const confirmPassword = ref('')
const userStore = useUserStore()
const router = useRouter()

const onSubmit = async () => {
  const { valid, errors } = validate(UserCreationSchema, model.value)
  if (!valid && errors) {
    modelErrors.value = errors as UserCreation
    return
  }

  isLoading.value = true
  const { status, data } = await userStore.createUser(model.value)
  if (status == 200) {
    showAlert.value = true
    setTimeout(() => {
      router.push({
        name: 'user-type',
        params: {
          id: data.user_id
        }
      })
    }, 2000)
  }

  isLoading.value = false
}

const setupErrors = (field: string, schema: ZodSchema, value: any) => {
  let fieldErrors: Record<string, string> = modelErrors.value
  const { errors } = validate(schema, value)
  fieldErrors[field] = errors ? (errors as string) : ''
  modelErrors.value = fieldErrors as UserCreation
}
</script>

<style scoped>
.sign-up-wrapper {
  @apply min-w-[150px] w-full min-[700px]:max-w-[450px] bg-white h-full flex items-center relative overflow-y-auto;
}

.sign-up-inner-wrap {
  @apply w-[70%] mx-auto;
}

@media screen and (max-height: 700px) {
  .sign-up-wrapper .sign-up-inner-wrap {
    max-height: 700px;
  }

  .sign-up-wrapper {
    align-items: start;
    padding: 4rem 0;
  }
}
</style>
