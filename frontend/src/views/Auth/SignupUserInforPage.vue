<template>
  <JobHunterInfoForm v-if="UserType.HUNTER == type" />
  <JobProviderInfoForm v-if="UserType.PROVIDER == type" />
</template>

<script setup lang="ts">
import JobHunterInfoForm from '@/components/auth/JobHunterInfoForm.vue'
import JobProviderInfoForm from '@/components/auth/JobProviderInfoForm.vue'

import { useRoute } from 'vue-router'
import { UserType } from '@shared/pack/index'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user-store'

const route = useRoute()
const userStore = useUserStore()

const isLoading = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true
  await userStore.fetchOneUser(route.params.id as string)
  isLoading.value = false
})

const type: UserType = route.params.type as unknown as UserType
</script>
