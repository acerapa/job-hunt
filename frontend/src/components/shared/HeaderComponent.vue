<template>
  <header
    class="h-[70px] w-full bg-white flex justify-center"
    @mouseenter="overHeader = true"
    @mouseleave="
      () => {
        showDroppdown = false
        overHeader = false
      }
    "
  >
    <div class="max-w-7xl h-full w-full text-main flex items-center justify-between px-8">
      <div class="flex gap-10 items-center">
        <p class="text-[32px] font-bold cursor-pointer">Job Hunt</p>
        <div class="flex gap-5" v-if="authUser?.type == UserType.HUNTER">
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
        <div class="flex gap-5" v-if="authUser?.type == UserType.PROVIDER">
          <RouterLink
            :to="{ name: 'provider-dashboard' }"
            class="text-base font-semibold"
            exact-active-class="!font-bold text-green-bright underline"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            :to="{ name: 'provider-jobs' }"
            class="text-base font-semibold"
            exact-active-class="!font-bold text-green-bright underline"
          >
            Jobs
          </RouterLink>
          <RouterLink
            :to="{ name: 'messages' }"
            class="text-base font-semibold"
            exact-active-class="!font-bold text-green-bright underline"
          >
            Messages
          </RouterLink>
        </div>
      </div>
      <div class="flex gap-3 items-center" v-if="!authUser">
        <RouterLink :to="{ name: 'signin' }" class="text-sm font-normal">Sign in</RouterLink>
        <div class="border w-0 h-8 border-main rounded"></div>
        <RouterLink :to="{ name: 'signup' }" class="btn-outline">Sign up</RouterLink>
      </div>

      <div v-if="authUser" class="cursor-pointer">
        <div class="flex gap-12 items-center">
          <button type="button">
            <img src="@/assets/icons/doorbell.svg" alt="doorbell.svg" />
          </button>
          <div class="flex gap-2 items-center relative" @click="showDroppdown = true">
            <img
              src="@/assets/images/default.png"
              class="aspect-square w-9 rounded-full"
              alt="default.png"
            />
            <div class="flex flex-col">
              <span class="text-sm font-bold">
                {{
                  `${authUser.first_name || ''} ${authUser.last_name || ''} ${!authUser.last_name && !authUser.first_name ? '@' + authUser.username : ''}`
                }}
              </span>
              <span class="text-[10px] font-semibold leading-tight">
                {{ UserTypeMap[authUser.type].text }}
              </span>
            </div>

            <!-- dropdown of the menu -->
            <div
              class="wrap shadow-lg dropdown absolute top-12 right-0 !px-0 flex flex-col"
              v-if="showDroppdown && overHeader"
            >
              <RouterLink
                :to="{ name: authUser.type == UserType.HUNTER ? 'profile' : 'provider-profile' }"
                exact-active-class="!bg-pale-blue font-bold"
                class="px-4 text-left hover:bg-pale-blue py-0.5 !pr-4"
              >
                Profile
              </RouterLink>
              <RouterLink
                v-if="authUser.type == UserType.PROVIDER"
                :to="{ name: 'provider-account-settings' }"
                exact-active-class="!bg-pale-blue font-bold"
                class="px-4 text-left hover:bg-pale-blue py-0.5 whitespace-nowrap !pr-4"
              >
                Account
              </RouterLink>
              <RouterLink
                v-if="authUser.type == UserType.PROVIDER"
                :to="{ name: 'provider-company-settings' }"
                exact-active-class="!bg-pale-blue font-bold"
                class="px-4 text-left hover:bg-pale-blue py-0.5 whitespace-nowrap !pr-4"
              >
                Settings
              </RouterLink>
              <button class="px-4 text-left hover:bg-pale-blue py-0.5 !pr-4" @click="onSignOut">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { UserType, UserTypeMap, type User } from '@shared/pack'
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const userType = ref<string>()
const authStore = useAuthStore()
const authUser = ref<User | null>()
const isLoading = ref<boolean>(false)
const overHeader = ref<boolean>(false)
const showDroppdown = ref<boolean>(false)
onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
  if (authUser.value) {
    userType.value = UserTypeMap[authUser.value.type].text
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
