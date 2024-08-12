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

import { useRoute, useRouter } from 'vue-router'
import { UserType } from '@shared/pack/index'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user-store'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isLoading = ref<boolean>(false)

const type = ref<UserType | null>()

onMounted(async () => {
  isLoading.value = true
  await userStore.fetchOneUser(route.params.id as string)
  if (userStore.user) {
    if (!userStore.user.user_registration.done_type) {
      router.push({
        name: 'user-type',
        params: {
          id: route.params.id
        }
      })
    }
    type.value = userStore.user.type
  }
  isLoading.value = false
})
</script>
