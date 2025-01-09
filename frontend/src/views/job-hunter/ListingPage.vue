<template>
  <div>
    <div class="wrap text-white !bg-green-bright px-16 pt-5 flex flex-col gap-3 sticky top-[70px]">
      <p class="text-base font-semibold">Start the HUNT!</p>
      <p class="text-sm font-normal">
        Search and explore job openings, Take time to apply the job that you take a liking.
      </p>
      <InputComponent
        :name="'search'"
        type="search"
        class="w-1/3"
        input-class="w-full"
        placeholder="Search Job"
      />
      <div class="filters relative">
        <button class="btn-white hover:text-main hover:border-white hover:bg-white">
          Add filter &plus;
        </button>

        <!-- filter dropdown -->
        <div class="wrap !p-2 shadow-md absolute mt-1 text-main">Filters</div>
      </div>
    </div>
    <div class="flex flex-col gap-4 mt-5">
      <JobComponent
        v-for="(job, ndx) in data"
        :key="ndx"
        :job="job"
        @click="selectedJob = job"
        class="w-full hover:border-green-bright"
      />
    </div>
  </div>

  <!-- // TODO: -->
  <code>
    <input type="checkbox" disabled />
    <code>Need to implement the filters</code>
    <br />
    <input type="checkbox" disabled />
    <code>Need to implement infinite scrolling</code>
    <br />
    <input type="checkbox" disabled />
    <code>Need to implement search</code>
  </code>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/shared/ModalComponent.vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import JobComponent from '@/components/shared/JobComponent-v1.vue'
import { useJobStore } from '@/stores/job-store'
import { computed, onMounted, ref } from 'vue'
import type { Job } from '@shared/pack'

const selectedJob = ref<Job | null>(null)
const jobStore = useJobStore()

const data = computed(() => jobStore.publishedJobs)

onMounted(async () => {
  await jobStore.fetchPublishedJobs()

  // set the first on the list as selected
  if (data.value.length) {
    selectedJob.value = data.value[0]
  }
})
</script>

<style scoped>
.job-description {
  @apply flex-1 max-w-[518px] overflow-y-auto h-fit sticky w-full max-h-[calc(100vh_-_134px)];
}
</style>
