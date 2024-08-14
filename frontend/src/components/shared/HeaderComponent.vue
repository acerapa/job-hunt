<template>
  <header class="h-[60px] w-full bg-sub flex justify-center">
    <div class="max-w-7xl h-full w-full text-main flex items-center justify-between px-4">
      <div class="flex gap-10 items-center">
        <p class="text-xl font-bold cursor-pointer">Job Hunt</p>
        <div class="flex gap-5">
          <RouterLink
            v-for="(route, ndx) in activeNavs"
            :key="ndx"
            :to="{ name: route.name }"
            active-class="!font-bold"
            class="text-base font-normal"
            >{{ route.text }}</RouterLink
          >
        </div>
      </div>
      <div class="flex gap-3 items-center" v-if="!authStore.authUser">
        <RouterLink :to="{ name: 'signin' }" class="font-normal">Sign in</RouterLink>
        <div class="border w-0 h-8 border-main rounded"></div>
        <RouterLink :to="{ name: 'signup' }" class="btn-outline">Sign up</RouterLink>
      </div>

      <p class="sign-out" v-if="authStore.authUser" @click="onSignOut">Sign out</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { navs } from '@/const/nav'
import { useAuthStore } from '@/stores/auth-store'
import { UserTypeMap } from '@shared/pack'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userType = ref<string>()
const authStore = useAuthStore()
const isLoading = ref<boolean>(false)

const activeNavs = ref(navs['NOAUTH'])
onMounted(async () => {
  await authStore.fetchAuthUser()
  if (authStore.authUser) {
    userType.value = UserTypeMap[authStore.authUser.type].text
    activeNavs.value = navs[authStore.authUser.type]
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
  @apply flex gap-1 items-center cursor-pointer;
}
</style>
