<template>
  <header class="h-[70px] w-full bg-white flex justify-center">
    <div class="max-w-7xl h-full w-full text-main flex items-center justify-between px-8">
      <div class="flex gap-10 items-center">
        <p class="text-[32px] font-bold cursor-pointer">Job Hunt</p>
        <div class="flex gap-5">
          <RouterLink
            :to="{ name: 'job-list' }"
            class="text-base font-semibold"
            exact-active-class="!font-bold text-green-bright underline"
            >Jobs</RouterLink
          >
          <RouterLink
            :to="{ name: 'messages' }"
            exact-active-class="!font-bold text-green-bright underline"
            class="text-base font-semibold"
          >
            Messages
          </RouterLink>
          <RouterLink
            :to="{ name: 'applications' }"
            exact-active-class="!font-bold text-green-bright underline"
            class="text-base font-semibold"
          >
            Applications
          </RouterLink>
        </div>
      </div>
      <div class="flex gap-3 items-center" v-if="!authStore.authUser">
        <RouterLink :to="{ name: 'signin' }" class="text-sm font-normal">Sign in</RouterLink>
        <div class="border w-0 h-8 border-main rounded"></div>
        <RouterLink :to="{ name: 'signup' }" class="btn-outline">Sign up</RouterLink>
      </div>

      <div v-if="authStore.authUser">
        <div class="flex gap-12 items-center">
          <button type="button">
            <img src="@/assets/icons/doorbell.svg" alt="doorbell.svg" />
          </button>
          <div class="flex gap-2 items-center">
            <img
              src="@/assets/images/default.png"
              class="aspect-square w-9 rounded-full"
              alt="default.png"
            />
            <div class="flex flex-col">
              <span class="text-sm font-bold">Harvey Aparece</span>
              <span class="text-[10px] font-semibold leading-tight">Job Hunter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { UserTypeMap } from '@shared/pack'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userType = ref<string>()
const authStore = useAuthStore()
const isLoading = ref<boolean>(false)
onMounted(async () => {
  await authStore.fetchAuthUser()
  if (authStore.authUser) {
    userType.value = UserTypeMap[authStore.authUser.type].text
  }
})

const onSignOut = async () => {
  isLoading.value = true
  await authStore.signOut()
  isLoading.value = false

  // navigate to sign in
  router.push({
    name: 'signin'
  })
}
</script>

<style scoped>
.sign-out::after {
  width: 24px;
  height: 24px;
  display: flex;
  content: url('@/assets/icons/logout.svg');
}

.sign-out {
  @apply text-sm flex gap-1 items-center cursor-pointer;
}
</style>
