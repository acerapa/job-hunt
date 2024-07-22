<template>
  <div class="bg-sub h-screen flex">
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
          <input type="text" class="input" placeholder="Email *" v-model="model.email" />
          <input type="text" class="input" placeholder="Username *" v-model="model.username" />
          <input
            type="password"
            class="input w-full"
            placeholder="Password *"
            v-model="model.password"
          />
          <input
            type="password"
            class="input w-full"
            placeholder="Confirm password *"
            v-model="confirmPassword"
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
import { UserCreationSchema, type UserCreation, validate } from '@shared/pack/index'

const preSet = {
  email: '',
  password: '',
  username: ''
}
const model = ref<UserCreation>(preSet)
const isLoading = ref<boolean>(false)

const confirmPassword = ref('')
const userStore = useUserStore()

const onSubmit = async () => {
  isLoading.value = true
  const { valid, errors } = validate(UserCreationSchema, model.value)
  console.log(valid, errors?.errors)
  const result = await userStore.createUser(model.value)
  isLoading.value = false
}
</script>
