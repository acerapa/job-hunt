<template>
  <JobHunterInfoForm v-if="UserType.HUNTER == type" />
  <JobProviderInfoForm v-if="UserType.PROVIDER == type" />
</template>

<script setup lang="ts">
import JobHunterInfoForm from '@/components/auth/JobHunterInfoForm.vue'
import JobProviderInfoForm from '@/components/auth/JobProviderInfoForm.vue'

import { useRoute } from 'vue-router'
import { UserType } from '@shared/pack'

const route = useRoute()

const type: UserType = route.params.type as unknown as UserType
</script>
