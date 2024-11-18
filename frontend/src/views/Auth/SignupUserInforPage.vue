<template>
  <LoadingComponent v-if="isLoading" />
  <div>
    <JobHunterInfoForm v-model="isLoading" v-if="UserType.HUNTER == type" />
    <JobProviderInfoForm v-model="isLoading" v-if="UserType.PROVIDER == type" />
  </div>
</template>

<script setup lang="ts">
import JobHunterInfoForm from '@/components/auth/JobHunterInfoForm.vue'
import JobProviderInfoForm from '@/components/auth/JobProviderInfoForm.vue'
import LoadingComponent from '@/components/shared/LoadingComponent.vue'

import { useRouter } from 'vue-router'
import { UserType, type User } from '@shared/pack/index'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'

const router = useRouter()
const authStore = useAuthStore()
const authUser = ref<User | null>()

const isLoading = ref<boolean>(false)
const type = ref<UserType | null>()

onMounted(async () => {
  isLoading.value = true
  authUser.value = await authStore.getAuthUser()
  if (!authUser.value) {
    router.push({
      name: 'signin'
    })
  } else {
    type.value = authUser.value.type
  }
  isLoading.value = false
})
</script>
