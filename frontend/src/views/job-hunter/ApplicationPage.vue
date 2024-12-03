<template>
  <div class="flex flex-col gap-4">
    <div class="wrap flex justify-between">
      <p class="text-lg font-semibold">Application and Liked Jobs</p>
      <button class="btn-outline" @click="router.back()">&longleftarrow; Back</button>
    </div>
    <TableComponent
      :has-add-new="false"
      :has-pagination="true"
      :row="JApplicationRow"
      title="Application lists"
      v-if="profileStore.profile"
      title-style="!text-base text-main"
      :data="profileStore.profile.applications"
    >
      <template #table-header>
        <div class="grid grid-cols-6 gap-3">
          <p class="col-span-2 font-bold text-main uppercase">JOB</p>
          <p class="col-span-2 font-bold text-main uppercase">COMPANY</p>
          <p class="col-span-1 font-bold text-main uppercase">STATUS</p>
          <p class="col-span-1 font-bold text-main uppercase">ACTIONS</p>
        </div>
      </template>
    </TableComponent>

    <TableComponent title="Liked Jobs" title-style="!text-base text-main" :has-add-new="false">
      <template #table-header>
        <div class="grid grid-cols-6 gap-3">
          <p class="col-span-2 font-bold text-main uppercase">JOB</p>
          <p class="col-span-1 font-bold text-main uppercase">JOB STATUS</p>
          <p class="col-span-1 font-bold text-main uppercase">POSTED ON</p>
          <p class="col-span-1 font-bold text-main uppercase">LIKED ON</p>
          <p class="col-span-1 font-bold text-main uppercase">ACTIONS</p>
        </div>
      </template>
    </TableComponent>
  </div>
</template>

<script setup lang="ts">
import TableComponent from '@/components/shared/TableComponent.vue'
import JApplicationRow from '@/components/application/JApplicationRow.vue'
import { onMounted, ref } from 'vue'
import { useProfileStore } from '@/stores/profile-store'
import type { Profile, User } from '@shared/pack'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'

const router = useRouter()
const authUser = ref<User<Profile> | null>()

const authStore = useAuthStore()
const profileStore = useProfileStore()

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()

  if (authUser.value && authUser.value.profile) {
    await profileStore.fetchProfileById(authUser.value.profile.id)
  }
})
</script>
