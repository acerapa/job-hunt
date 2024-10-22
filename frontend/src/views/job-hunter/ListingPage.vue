<template>
  <div class="flex gap-4 w-full">
    <SideFilter />
    <div class="list-wrapper thin-scrollbar">
      <div class="wrap text-white !bg-green-bright px-16 pt-5 flex flex-col gap-3 sticky top-0">
        <p class="text-base font-semibold">Start the HUNT!</p>
        <p class="text-sm font-normal">
          Search and explore job openings, Take time to apply the job that you take a liking.
        </p>
        <InputComponent
          :name="'search'"
          type="search"
          class="w-full"
          input-class="w-full"
          placeholder="Search Job"
        />
      </div>
      <div class="flex flex-col gap-4 mt-5 max-w-[450px]">
        <JobComponent v-for="(job, ndx) in jobs" :key="ndx" :job="job" class="w-full" />
      </div>
    </div>
    <JobDescription :job="job" class="job-description thin-scrollbar" />
  </div>
</template>

<script setup lang="ts">
import SideFilter from '@/components/job-list/SideFilter.vue'
import JobDescription from '@/components/shared/JobDescription.vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import JobComponent from '@/components/shared/JobComponent-v1.vue'
import { useJobStore } from '@/stores/job-store'
import type { Job } from '@/types'

const jobStore = useJobStore()

const jobs: Job[] = jobStore.jobs
const job: Job = jobs[0]
</script>

<style scoped>
.list-wrapper {
  @apply flex-1 w-full overflow-y-auto sticky top-0 max-w-[450px] h-full max-h-[calc(100vh_-_134px)];
}

.job-description {
  @apply flex-1 max-w-[518px] overflow-y-auto h-fit sticky w-full max-h-[calc(100vh_-_134px)];
}
</style>
