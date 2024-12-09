<template>
  <div>
    <TableComponent
      title="List of Applicants"
      :has-add-new="false"
      :has-pagination="true"
      :row="PApplicationListRow"
      :data="applicants"
    >
      <template v-slot:table-header>
        <div class="grid grid-cols-8 gap-3 text-sm">
          <p class="col-span-2 font-bold text-main">NAME</p>
          <p class="col-span-2 font-bold text-main">JOB</p>
          <p class="col-span-2 font-bold text-main">STATUS</p>
          <p class="col-span-1 font-bold text-main">APPLIED ON</p>
          <p class="col-span-1 font-bold text-main">ACTIONS</p>
        </div>
      </template>
    </TableComponent>
  </div>
</template>

<script setup lang="ts">
import TableComponent from '@/components/shared/TableComponent.vue'
import PApplicationListRow from '@/components/application/PApplicationListRow.vue'
import { useJobStore } from '@/stores/job-store'
import { onMounted, ref } from 'vue'
import type { Answer, Application, Job, Profile, User } from '@shared/pack'
import { useRoute } from 'vue-router'

const route = useRoute()
const jobStore = useJobStore()
const job = ref<Job | null>()
const applicants = ref<Application<Job, Profile<User>, Answer>[]>([])

onMounted(async () => {
  if (route.params.id) {
    const jobId = parseInt(route.params.id as string)
    job.value = await jobStore.getJobById(jobId)

    if (job.value && job.value.applications) {
      applicants.value = job.value.applications as Application<Job, Profile<User>, Answer>[]
    }
  }
})
</script>
