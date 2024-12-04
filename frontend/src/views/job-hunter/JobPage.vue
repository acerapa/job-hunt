<template>
  <div class="flex flex-col gap-4 mb-10">
    <div class="wrap flex justify-between">
      <p class="text-lg font-semibold">Job Details</p>
      <button class="btn-outline" @click="router.back()">&longleftarrow; Back</button>
    </div>

    <div class="wrap flex flex-col gap-5" v-if="job">
      <div class="flex justify-between items-start">
        <div class="flex flex-col gap-2">
          <div class="flex gap-5 items-center">
            <img
              alt="company logo"
              class="border-2 rounded w-[80px] h-[80px]"
              :src="job.company.logo ? job.company.logo : battlePng"
            />
            <div class="flex flex-col gap-0">
              <p class="font-medium text-gray-strong">{{ job.company.name }}</p>
              <p class="text-lg text-main font-bold">{{ job.title }}</p>
              <p class="text-xs font-semibold text-pale-gray">
                {{ `Posted on ${new Date(job.posted_on).toLocaleDateString()}` }}
              </p>
            </div>
          </div>
          <div class="flex gap-1 items-center">
            <button
              class="text-xs border border-blue-bright rounded-lg px-2 text-blue-bright"
              v-for="type in job.work_type"
              :key="type"
            >
              {{ capitalizeFirst(type) }}
            </button>
            <p v-if="job.work_setup && job.work_setup.length">|</p>
            <button
              class="text-xs border border-gray-strong rounded-lg px-2 text-gray-strong"
              v-for="setup in job.work_setup"
              :key="setup"
            >
              {{ capitalizeFirst(setup) }}
            </button>
            <p v-if="job.salary_range">|</p>
            <p class="text-sm font-bold text-green-bright leading-[0.875rem]">
              {{ job.salary_range }}
            </p>
          </div>
        </div>
        <div class="flex gap-3 items-center">
          <button>
            <img src="@/assets/icons/favorite.svg" alt="favorite.svg" />
          </button>
          <button class="btn-success">Apply now</button>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <p class="font-semibold">Job Description</p>
        <p class="text-gray-strong leading-snug tracking-wider">{{ job.description }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <p class="font-semibold">Skills</p>
        <p>Nothing to show for now!</p>
      </div>

      <div class="flex flex-col gap-2">
        <p class="font-semibold">Key Responsibilities</p>
        <p class="text-gray-strong leading-snug tracking-wider">{{ job.responsibilities }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <p class="font-semibold">Qualifications</p>
        <p class="text-gray-strong leading-snug tracking-wider">{{ job.qualifications }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <p class="font-semibold">What we offer</p>
        <p class="text-gray-strong leading-snug tracking-wider">{{ job.what_we_offer }}</p>
      </div>
    </div>

    <div class="wrap flex flex-col gap-4" v-if="job && job.company">
      <div class="flex justify-between items-start">
        <p class="text-base font-semibold">About the company</p>
        <button class="btn-success" @click="onMoreDetails">More details</button>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex gap-1 items-center">
          <p class="font-medium text-gray-600">{{ job.company.name }}</p>
          <div class="flex">
            <img
              src="@/assets/images/star-filled.png"
              alt="star-filled.png"
              class="w-4 h-4"
              v-for="ndx in 5"
              :key="ndx"
            />
          </div>
        </div>

        <p class="text-gray-strong leading-snug tracking-wider">{{ job.company.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJobStore } from '@/stores/job-store'
import { capitalizeFirst, type Company, type Job } from '@shared/pack'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// temporary
import battlePng from '@/assets/images/battle.png'
import { CompanyDetailsNav } from '@/types'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()

const job = ref<Job<Object, Company> | null>()

const onMoreDetails = () => {
  router.push({
    name: 'company-details',
    params: { id: job.value?.company.id, current_tab: CompanyDetailsNav.OVERVIEW }
  })
}

onMounted(async () => {
  if (route.params.id) {
    const jobId = parseInt(route.params.id as string)
    await jobStore.fetchJobById(jobId)
    job.value = await jobStore.getJobById(jobId)
  }
})
</script>
