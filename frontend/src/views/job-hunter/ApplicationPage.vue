<template>
  <div class="flex gap-4 h-[100vh_-_134px]">
    <div class="flex max-w-[500px] w-full flex-col">
      <div class="wrap text-white !bg-green-bright !px-6 !py-2">
        <p class="font-bold">Applied and Liked jobs</p>
        <p class="text-sm leading-tight mt-1">
          Browse the jobs you applied and check the status. Also plan your next job to apply from
          your likes.
        </p>
        <div class="flex gap-3 mt-3 items-center">
          <InputComponent
            type="select"
            name="type"
            class="w-32"
            :options="[
              { text: 'Applied', value: 'applied' },
              { text: 'Liked', value: 'liked' }
            ]"
            v-model="view"
            placeholder="Select View"
          />
          <div class="bg-white rounded-md flex-1 flex gap-1 items-center pr-1">
            <InputComponent
              type="text"
              name="type"
              placeholder="Search"
              class="flex-1"
              input-class="border-none"
            />
            <button
              class="btn !bg-green-bright hover:!bg-white hover:!border-green-bright hover:!text-green-bright"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 mt-6">
        <ApplicationJob :has-status="view == 'applied'" />
        <ApplicationJob :has-status="view == 'applied'" />
        <ApplicationJob :has-status="view == 'applied'" />
      </div>
    </div>
    <div class="wrap flex-1 w-full" v-if="view == 'applied'">
      <div class="flex items-start justify-between h-fit w-full">
        <div class="flex gap-3 items-center flex-1">
          <img src="@/assets/images/default.png" alt="default.png" class="w-24 h-24 rounded-full" />
          <div>
            <div class="flex flex-col mb-2">
              <p class="text-base font-bold">Harvey Aparece</p>
              <p class="text-pastel-gray text-xs font-semibold">Web Developer</p>
            </div>
            <p class="text-sm">Nasipit Rd, Talamban Cebu City, Philippines</p>
            <p class="text-sm">09508605332</p>
            <p class="text-sm">harvey.aparece.work@gmail.com</p>
          </div>
        </div>
        <RouterLink :to="{ name: 'profile' }" class="btn-outline">Update</RouterLink>
      </div>
      <hr class="mt-3 border-green-theme border -mx-4" />
      <p class="text-base font-bold mt-3">Employer Specific Questions</p>
      <div class="flex flex-col gap-4 w-5/6 mt-4">
        <InputComponent
          type="text"
          name="q1"
          label-css="text-sm"
          label="How many years you have experience in Python only in working professionally? *"
        />
        <InputComponent
          type="textarea"
          name="q1"
          label-css="text-sm"
          label="How will you manage stress?"
        />
        <InputComponent
          type="textarea"
          name="q1"
          label-css="text-sm"
          label="Describe a challenging situation you faced at work and how you handled it."
        />
        <InputComponent
          type="textarea"
          name="q1"
          label-css="text-sm"
          label="Can you describe a project you worked on that is relevant to this position?"
        />
      </div>
    </div>
    <JobDescription :job="jobStore.jobs[0]" v-if="view == 'liked'" />
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import ApplicationJob from '@/components/application/ApplicationJob.vue'
import JobDescription from '@/components/shared/JobDescription.vue'
import { ref } from 'vue'
import { useJobStore } from '@/stores/job-store'
import { RouterLink } from 'vue-router'

const view = ref<'applied' | 'liked'>()

const jobStore = useJobStore()
</script>
