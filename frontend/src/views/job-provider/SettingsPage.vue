<template>
  <ShiftModal v-model="showShiftModal" v-if="showShiftModal" />
  <div class="flex flex-col gap-4 pb-10">
    <div class="wrap !bg-vibrant-green text-white">
      <p class="text-xl font-medium">Settings</p>
    </div>
    <TableComponent
      title="Set the shifts you want to use"
      :has-pagination="false"
      :has-add-new="true"
      :row="ShiftListRow"
      :data="data"
      @on-new="showShiftModal = true"
    >
      <template v-slot:table-header>
        <div class="grid grid-cols-6 gap-3">
          <p class="text-main font-bold col-span-2">NAME</p>
          <p class="text-main font-bold col-span-1">START</p>
          <p class="text-main font-bold col-span-1">END</p>
          <p class="text-main font-bold col-span-1">TYPE</p>
          <p class="text-main font-bold col-span-1 text-center">ACTIONS</p>
        </div>
      </template>
    </TableComponent>
  </div>
</template>

<script setup lang="ts">
import ShiftModal from '@/components/settings/ShiftModal.vue'
import TableComponent from '@/components/shared/TableComponent.vue'
import { useAuthStore } from '@/stores/auth-store'
import { useCompanyStore } from '@/stores/company-store'
import type { Company, Profile, User } from '@shared/pack'
import { computed, onMounted, ref } from 'vue'
import ShiftListRow from '@/components/settings/ShiftListRow.vue'

const authUser = ref<User<Profile, Company> | null>(null)

const authStore = useAuthStore()
const companyStore = useCompanyStore()

const data = computed(() => companyStore.shifts)

const showShiftModal = ref<boolean>(false)

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
  if (authUser.value && authUser.value.company) {
    await companyStore.getCompanyShifts(authUser.value.company.id)
  }
})
</script>
