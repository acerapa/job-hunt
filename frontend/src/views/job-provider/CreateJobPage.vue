<template>
  <div class="flex gap-4">
    <div class="max-w-[550px] w-full h-full max-h-[calc(100vh_-_134px)] flex flex-col gap-4">
      <div class="wrap text-white !bg-green-bright sticky top-0">
        <p class="text-2xl font-semibold">Create Job Posting</p>
      </div>
      <div class="wrap !pt-0 flex flex-col gap-3 h-full overflow-y-auto thin-scrollbar">
        <div
          class="flex pt-4 gap-3 pb-3 border-b justify-center items-center font-bold sticky top-0 bg-white z-10"
        >
          <button class="step-item active-item">1</button>
          <button class="step-item">2</button>
        </div>

        <InputComponent
          type="text"
          name="title"
          label="Job Title"
          label-css="font-medium"
          placeholder="Enter job title"
        />
        <div class="flex flex-col gap-0">
          <p class="font-medium">Available work setup</p>
          <div class="flex gap-4">
            <CheckButtonComponent label="On-site" id="on-site" name="on-site" value="on-site" />
            <CheckButtonComponent label="Remote" id="remote" name="remote" value="remote" />
            <CheckButtonComponent label="Hybrid" id="hybrid" name="hybrid" value="hybrid" />
          </div>
          <div class="px-3 mt-4 flex flex-col gap-2">
            <InputComponent
              type="checkbox"
              input-class="!w-fit"
              id="same-as-account"
              name="same_as_account"
              label="Same as account"
              class="flex items-center flex-row-reverse justify-end gap-2"
            />
            <InputComponent
              type="text"
              name="location"
              label="Location"
              placeholder="Enter location"
            />
          </div>
        </div>
        <div class="flex flex-col gap-0">
          <p class="font-medium">Available working hours</p>
          <div class="flex gap-4">
            <CheckButtonComponent
              label="Full-time"
              id="full-time"
              name="full-time"
              value="full-time"
            />
            <CheckButtonComponent
              label="Part-time"
              id="part-time"
              name="part-time"
              value="part-time"
            />
          </div>
          <div class="px-3 mt-4 flex flex-col gap-2">
            <InputComponent
              type="checkbox"
              input-class="!w-fit"
              id="flexible-hours"
              name="flexible-hours"
              label="Flexible hours"
              class="flex items-center flex-row-reverse justify-end gap-2"
            />

            <div>
              <p>Add availble shifts</p>
              <div class="flex gap-4 flex-wrap">
                <CheckButtonComponent label="Morning" id="morning" name="morning" value="morning" />
                <CheckButtonComponent
                  label="Afternoon"
                  id="afternoon"
                  name="afternoon"
                  value="afternoon"
                />
                <CheckButtonComponent label="Evening" id="evening" name="evening" value="evening" />
                <CheckButtonComponent
                  label="Grave yard"
                  id="grave-ward"
                  name="grave-ward"
                  value="grave-ward"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-0">
          <p class="font-medium">Enter Salary Range</p>
          <div class="flex gap-3">
            <InputComponent
              name="min"
              label="Min"
              type="number"
              class="flex-1"
              label-css="text-sm"
              placeholder="Enter min"
            />
            <InputComponent
              name="max"
              label="Max"
              type="number"
              class="flex-1"
              label-css="text-sm"
              placeholder="Enter max"
            />
          </div>
        </div>
        <div class="flex flex-col gap-0">
          <p class="font-medium">Job Description</p>
          <InputComponent type="textarea" name="description" placeholder="Enter job description" />
        </div>
      </div>
    </div>
    <div class="h-full max-h-[calc(100vh_-_134px)] overflow-y-auto thin-scrollbar flex-1">
      <JobDescription :job="job" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import JobDescription from '@/components/shared/JobDescription.vue'
import CheckButtonComponent from '@/components/shared/CheckButtonComponent.vue'
import { useJobStore } from '@/stores/job-store'

const jobStore = useJobStore()

const job = jobStore.jobs[0]
</script>

<style scoped>
.step-item {
  @apply text-main border border-main w-8 h-8 rounded-full;
}

.active-item {
  @apply !text-white !bg-main;
}
</style>
