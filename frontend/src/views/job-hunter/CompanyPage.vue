<template>
  <div class="flex flex-col gap-4 pb-10">
    <div class="wrap flex justify-between">
      <p class="text-lg font-semibold">Company Details</p>
      <button class="btn-outline" @click="router.push({ name: 'job-list' })">
        &longleftarrow; Back
      </button>
    </div>
    <div class="wrap flex flex-col" v-if="company">
      <div class="w-full h-60">
        <img
          class="w-full h-full object-cover rounded-t"
          src="@/assets/images/default-company-banner.jpg"
          alt="company banner"
        />
      </div>
      <div class="px-3 -mt-7 flex flex-col gap-5">
        <div class="flex justify-between items-end">
          <div class="flex gap-3 items-end">
            <div class="w-20 h-20 p-1 bg-white rounded shadow">
              <img
                class="w-full h-full"
                :src="company.logo ? company.logo : battlePng"
                alt="company logo"
              />
            </div>
            <div class="flex flex-col gap-0">
              <div class="flex items-center gap-1">
                <p class="text-lg font-semibold">{{ company.name }}</p>
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
              <RouterLink class="text-sm" :to="company.website">{{ company.website }}</RouterLink>
            </div>
          </div>
          <button class="btn h-fit">Write review</button>
        </div>

        <div class="border-main border-b-2 flex gap-0 -mx-3 px-3">
          <RouterLink
            v-for="(nav, ndx) in Object.keys(CompanyDetailsNavMap)"
            :key="ndx"
            :to="{ name: 'company-details', params: { id: company.id, current_tab: nav } }"
            :class="nav == route.params.current_tab ? 'active-nav' : ''"
            class="company-nav"
          >
            {{ CompanyDetailsNavMap[nav as CompanyDetailsNav] }}
          </RouterLink>
        </div>

        <div
          class="flex flex-col gap-3 mt-4"
          v-if="CompanyDetailsNav.OVERVIEW == route.params.current_tab"
        >
          <p class="font-semibold">Company Overview</p>

          <div class="grid grid-rows-2 gap-3 w-fit my-5">
            <div class="flex gap-16 ring-2 ring-blue-lt px-3 py-0.5 rounded justify-between">
              <p class="font-normal text-sm text-main">Jobs</p>
              <p class="text-sm text-blue-bright font-medium">{{ company.jobs?.length }}</p>
            </div>
            <div class="flex gap-16 ring-2 ring-blue-lt px-3 py-0.5 rounded justify-between">
              <p class="font-normal text-sm text-main">Company Size</p>
              <p class="text-sm text-blue-bright font-medium">{{ company.employee_range }}</p>
            </div>
            <div
              class="flex gap-16 ring-2 ring-blue-lt px-3 py-0.5 rounded justify-between"
              v-if="company.industry"
            >
              <p class="font-normal text-sm text-main">Industry</p>
              <p class="text-sm text-blue-bright font-medium">{{ company.industry.name }}</p>
            </div>
          </div>

          <div>
            <p class="font-medium">Description</p>
            <p class="text-gray-strong indent-4">{{ company.description }}</p>
          </div>

          <div v-if="company.mission">
            <p class="font-medium">Mission</p>
            <p class="text-gray-strong indent-4 italic">{{ company.mission }}</p>
          </div>

          <div v-if="company.vision">
            <p class="font-medium">Vision</p>
            <p class="text-gray-strong indent-4 italic">{{ company.vision }}</p>
          </div>

          <div class="mt-5" v-if="company.jobs">
            <p class="font-semibold">Jobs</p>
          </div>

          <div class="mt-5">
            <p class="font-semibold">Reviews</p>
          </div>
        </div>

        <div class="mt-4" v-if="CompanyDetailsNav.JOBS == route.params.current_tab">
          <p class="font-semibold">Open Jobs</p>
        </div>

        <div class="mt-4" v-if="CompanyDetailsNav.REVIEWS == route.params.current_tab">
          <p class="font-semibold">Reviews</p>
        </div>
      </div>
    </div>

    <div class="wrap">
      <p class="text-lg font-semibold">Similar Companies</p>
      <p>No data to show for now</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'

import battlePng from '@/assets/images/battle.png'

import { onMounted, ref } from 'vue'
import { useCompanyStore } from '@/stores/company-store'
import type { Company, Industry, Job } from '@shared/pack'
import { CompanyDetailsNav, CompanyDetailsNavMap } from '@/types'

const company = ref<Company<Object, Job, Object, Industry> | null>()

const route = useRoute()
const router = useRouter()
const companyStore = useCompanyStore()

onMounted(async () => {
  if (route.params.id) {
    const companyId = parseInt(route.params.id as string)
    company.value = await companyStore.getCompanyById(companyId)
  }
})
</script>

<style scoped>
.active-nav {
  box-shadow: 0px 2px 0px white;
  @apply border-2 !border-main !border-b-white font-medium;
}

.company-nav {
  @apply px-3 pt-1 border-2 border-transparent rounded-t -mb-[1px];
}
</style>
