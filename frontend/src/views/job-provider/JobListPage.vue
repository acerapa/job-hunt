<template>
  <div>
    <TableComponent
      title="List of Jobs"
      :has-pagination="true"
      :data="data"
      :row="PJobListRow"
      @on-new="onNew"
    >
      <template v-slot:table-header>
        <div class="grid grid-cols-8 gap-3 text-sm">
          <p class="col-span-4 font-bold text-main">TITLE</p>
          <p class="col-span-1 font-bold text-main">JOB HUNTERS</p>
          <p class="col-span-1 font-bold text-main">STATUS</p>
          <p class="col-span-1 font-bold text-main">ADDED ON</p>
          <p class="col-span-1 font-bold text-main">ACTIONS</p>
        </div>
      </template>
    </TableComponent>

    <!-- TODOS: For the jobs overall -->
    <code>
      Here are the todos:
      <br />
      <input type="checkbox" disabled />
      <code class="ml-1">Need to setup the applicatants for a job</code>
      <br />
      <input type="checkbox" disabled />
      <code class="ml-1">Need to make the pagination, search, and menus works</code>
    </code>
  </div>
</template>

<script setup lang="ts">
import TableComponent from '@/components/shared/TableComponent.vue'
import PJobListRow from '@/components/job-list/PJobListRow.vue'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useJobStore } from '@/stores/job-store'
import type { Company, Profile, User } from '@shared/pack'
import { useAuthStore } from '@/stores/auth-store'

const router = useRouter()
const jobStore = useJobStore()
const authStore = useAuthStore()
const authUser = ref<User<Profile, Company> | null>(null)

const data = computed(() => jobStore.jobs)

const onNew = () => {
  router.push({
    name: 'provider-jobs-create'
  })
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
  if (authUser.value && authUser.value.company) {
    await jobStore.getJobs(authUser.value.company.id)
  }
})
</script>
