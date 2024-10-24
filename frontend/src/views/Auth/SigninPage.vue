<template>
  <div class="bg-sub h-screen flex">
    <div class="w-full h-full bg-green-100 flex items-center max-[700px]:hidden">
      <div class="relative w-[80%] aspect-square max-w-[1175px] max-h-[80%] mx-auto">
        <img
          src="@/assets/images/good-job.png"
          class="absolute left-1/2 top-10 -translate-x-1/2 w-1/4"
          alt="good-job"
        />
        <img
          src="@/assets/images/cloud.png"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2"
          alt="cloud"
        />
        <img
          src="@/assets/images/looking-for-job.png"
          class="absolute bottom-5 w-1/4"
          alt="looking-for-job"
        />
        <img
          src="@/assets/images/already-working.png"
          class="absolute right-5 bottom-0 w-1/4"
          alt="already-working"
        />
        <img
          src="@/assets/images/trial-paper-plane.png"
          class="absolute left-[19%] top-[28%] w-1/6"
          alt="trial-paper-plane"
        />
        <img
          src="@/assets/images/trial-paper-plane.png"
          class="absolute bottom-0 w-1/6 rotate-[127deg] top-[24%] right-[17%]"
          alt="trial-paper-plane"
        />
      </div>
    </div>
    <div class="min-w-[150px] w-full min-[700px]:max-w-[450px] bg-white h-full flex items-center">
      <div class="w-[70%] mx-auto">
        <div class="flex flex-col items-center">
          <p class="text-main text-base">Sign in to</p>
          <p class="text-main text-[32px] font-bold">Job Hunt</p>
        </div>
        <div class="flex flex-col gap-5 mt-6">
          <InputComponent
            type="text"
            name="usercred"
            input-class="w-full"
            v-model="model.usercred"
            placeholder="Username or Email"
            :error-message="modelErrors.usercred"
            @input="setupErrors('usercred', UserAuthSchema.shape.usercred, model.usercred)"
          />
          <div class="flex flex-col items-end gap-4">
            <InputComponent
              class="w-full"
              name="password"
              input-class="w-full"
              placeholder="Password"
              v-model="model.password"
              :error-message="modelErrors.password"
              :type="showPassword ? 'text' : 'password'"
              @input="setupErrors('password', UserAuthSchema.shape.password, model.password)"
            />
            <div class="flex gap-1 items-center">
              <input type="checkbox" class="input w-4 h-4" v-model="showPassword" />
              <p class="text-xs">Show password</p>
            </div>
          </div>
        </div>
        <button class="btn block mx-auto mt-6 !px-4 !py-2" @click="onSignin">Sign in</button>
        <div class="flex flex-col gap-4 mt-5">
          <p class="text-main text-base mx-auto">or Sign in with</p>
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
            No account yet?
            <RouterLink :to="{ name: 'signup' }" class="text-blue-500 underline"
              >Sign up here!</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { validate, UserAuthSchema, type UserCred, ZodSchema } from '@shared/pack'
import { ref } from 'vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import { useRouter } from 'vue-router'

const showPassword = ref(false)
const model = ref<Partial<UserCred>>({})
const modelErrors = ref<Partial<UserCred>>({})
const router = useRouter()

const authStore = useAuthStore()

const onSignin = async () => {
  const { valid, errors } = validate(UserAuthSchema, model.value)
  if (!valid && errors) {
    modelErrors.value = errors as Partial<UserCred>
    return
  }
  const authenticated = await authStore.signIn(model.value as UserCred)
  if (authenticated) {
    router.push({
      name: 'dashboard'
    })
  }
}

const setupErrors = (field: string, schema: ZodSchema, value: any) => {
  let fieldErrors: Record<string, string> = modelErrors.value
  const { errors } = validate(schema, value)
  fieldErrors[field] = errors ? (errors as string) : ''
  modelErrors.value = fieldErrors as Partial<UserCred>
}
</script>
