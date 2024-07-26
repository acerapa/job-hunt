<template>
  <div class="bg-sub h-screen flex relative">
    <AlertComponent
      :messsage="'Successfully Created'"
      :status="AlertStatus.SUCCESS"
      v-model="showAlert"
      v-if="showAlert"
    />
    <div class="w-full h-full bg-green-100 flex items-center max-[700px]:hidden">
      <div class="relative w-[80%] aspect-square max-w-[1175px] max-h-[80%] mx-auto">
        <img
          src="@/assets/images/looking-for-job.png"
          class="absolute left-0 top-10 w-1/4"
          alt="looking-for-job"
        />
        <img
          src="@/assets/images/happy-man-with-headphones.png"
          class="absolute right-0 top-10 w-1/5"
          alt="happy-man-with-headphones"
        />
        <img
          src="@/assets/images/join-now.png"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2"
          alt="cloud"
        />
        <img
          src="@/assets/images/happy-man-jumping.png"
          class="absolute bottom-0 w-1/4"
          alt="happy-man-jumping"
        />
        <img
          src="@/assets/images/already-working.png"
          class="absolute right-5 bottom-0 w-1/4"
          alt="already-working"
        />
        <img
          src="@/assets/images/trial-paper-plane.png"
          class="absolute left-[2%] top-[35%] w-1/6"
          alt="trial-paper-plane"
        />
        <img
          src="@/assets/images/trial-paper-plane.png"
          class="absolute bottom-0 w-1/6 right-[2%] rotate-[160deg] top-[35%]"
          alt="trial-paper-plane"
        />
      </div>
    </div>
    <div
      class="min-w-[150px] w-full min-[700px]:max-w-[450px] bg-white h-full flex items-center relative"
    >
      <LoadingComponent v-if="isLoading" />
      <div class="w-[70%] mx-auto">
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
          id: data.id
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
