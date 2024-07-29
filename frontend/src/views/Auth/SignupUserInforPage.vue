<template>
  <LoadingComponent v-if="isLoading" />
  <div>
    <JobHunterInfoForm v-model="isLoading" v-if="UserType.HUNTER == type" />
    <JobProviderInfoForm v-if="UserType.PROVIDER == type" />
  </div>
</template>

<script setup lang="ts">
import JobHunterInfoForm from '@/components/auth/JobHunterInfoForm.vue'
import JobProviderInfoForm from '@/components/auth/JobProviderInfoForm.vue'
import LoadingComponent from '@/components/shared/LoadingComponent.vue'

import { useRoute } from 'vue-router'
import { UserType } from '@shared/pack/index'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user-store'

const route = useRoute()
const userStore = useUserStore()

const isLoading = ref<boolean>(false)

const type = ref<UserType | null>()

onMounted(async () => {
  isLoading.value = true
  await userStore.fetchOneUser(route.params.id as string)
  type.value = userStore.user?.type
  isLoading.value = false
})
</script>
