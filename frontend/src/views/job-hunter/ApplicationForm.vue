<template>
  <div class="flex gap-4">
    <div class="w-full max-w-[450px]">
      <div class="wrap !bg-green-bright text-white flex gap-3 items-center">
        <img src="@/assets/icons/high-importance.png" alt="high-importance.png" />
        <div>
          <span class="block font-bold">Keep your profile updated</span>
          <p class="text-sm leading-4">
            This is to make sure that the information your sending is complete and accurate
          </p>
        </div>
      </div>
      <div class="wrap mt-1 flex gap-3 items-center" v-if="authUser">
        <img src="@/assets/images/default.png" alt="default.png" />
        <div>
          <RouterLink :to="{ name: 'profile' }" class="btn-outline float-right">Update</RouterLink>
          <div class="flex flex-col gap-0">
            <p class="font-bold">{{ authUser.first_name + ' ' + authUser.last_name }}</p>
            <span class="text-sm">Web Developer</span>
          </div>
          <p>{{ profileAddress }}</p>
          <p>{{ authUser.phone }}</p>
          <p>{{ authUser.email }}</p>
        </div>
      </div>

      <div class="wrap !bg-green-bright text-white mt-4 flex gap-3 items-center">
        <img src="@/assets/icons/high-importance.png" alt="high-importance.png" />
        <div>
          <span class="block font-bold">You are applying this position </span>
          <p class="text-sm leading-4">
            Please verify your information to make sure atmost accuracy
          </p>
        </div>
      </div>
      <div class="wrap mt-1">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-2xl font-bold">{{ job?.title }}</p>
            <div class="flex gap-2 items-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1663127721165-f29d5bbd3da1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="company"
                class="w-10 h-10 rounded-full object-contain bg-gray-950"
              />
              <p class="text-gray-strong font-medium text-sm">{{ currentCompany?.name }}</p>
              <div class="flex gap-1">
                <img
                  src="@/assets/images/star-filled.png"
                  alt="star-filled.png"
                  v-for="ndx in 5"
                  :key="ndx"
                />
              </div>
            </div>
          </div>
          <button type="button" class="btn detail-btn">Details</button>
        </div>
        <div class="px-2 mt-3 flex flex-col gap-3">
          <div class="flex gap-2 items-center" v-if="jobAddress">
            <img src="@/assets/icons/map-pin.png" alt="map-pin.png" />
            <span class="text-xs text-gray-strong">
              {{ jobAddress }}
            </span>
          </div>
          <div class="flex gap-2 items-center" v-if="workType">
            <img src="@/assets/icons/clock.png" alt="clock.png" />
            <span class="text-xs text-gray-strong">{{ workType }}</span>
          </div>
          <div class="flex gap-2 items-center" v-if="workSetup">
            <img src="@/assets/icons/office.png" alt="office.png" />
            <span class="text-xs text-gray-strong">{{ workSetup }}</span>
          </div>
          <div class="flex gap-2 items-center" v-if="job?.salary_range">
            <img src="@/assets/icons/money-bag.png" alt="money-bag.png" />
            <span class="text-xs text-gray-strong">{{ job?.salary_range }}</span>
          </div>
        </div>
        <div class="mt-10">
          <p class="text-sm font-medium">Job Description</p>
          <p class="mt-4 font-normal text-sm text-justify">
            {{ job?.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="wrap flex-1 !p-5">
      <div class="flex justify-between items-center">
        <p class="font-bold text-base">Employer Specific Questions</p>
        <button class="btn font-bold">Submit Application</button>
      </div>
      <div class="flex flex-col gap-4 mt-5" v-if="job?.questions?.length">
        <InputComponent
          v-for="question in job.questions"
          :key="question.id"
          :name="`question-${question.id}`"
          :type="question.type"
          placeholder="Ans"
          class="w-4/5"
          :label="`${question.question} ${question.is_required ? '*' : ''}`"
          label-css="text-sm font-semibold"
        />
      </div>
    </div>
  </div>
  <!-- // TODO: -->
  <code>
    <input type="checkbox" disabled />
    <code class="ml-3">Need to figure out the title specified in Job hunters</code>
    <br />
  </code>
</template>
<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import { useAuthStore } from '@/stores/auth-store'
import { useJobStore } from '@/stores/job-store'
import {
  WorkSetupMap,
  WorkTypeMap,
  type Application,
  type Company,
  type Job,
  type Profile,
  type Question,
  type User
} from '@shared/pack'
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const authUser = ref<User<Profile> | null>(null)
const currentCompany = ref<Company | null>(null)
const application = ref<Partial<Application>>({})
const job = ref<Job<Object, Company, Object, Object, Object, Question> | null>(null)

const jobStore = useJobStore()
const authStore = useAuthStore()

const profileAddress = computed(() => {
  let addressStr = ''
  if (authUser.value && authUser.value.profile && authUser.value.profile.address) {
    addressStr = Object.values(authUser.value.profile.address).slice(0, -2).join(', ')
  }

  return addressStr
})

const jobAddress = computed(() => {
  let addressStr = ''
  if (currentCompany.value && currentCompany.value.address) {
    addressStr = Object.values(currentCompany.value.address).slice(0, -2).join(', ')
  }

  return addressStr
})

const workType = computed(() => {
  let workTypeStr = ''
  if (job.value && job.value.work_type) {
    workTypeStr = job.value.work_type.map((type) => WorkTypeMap[type].text).join(', ')
  }

  return workTypeStr
})

const workSetup = computed(() => {
  let workSetupStr = ''
  if (job.value && job.value.work_setup) {
    workSetupStr = job.value.work_setup.map((type) => WorkSetupMap[type].text).join(', ')
  }
  return workSetupStr
})

onMounted(async () => {
  if (route.params.job_id) {
    job.value = await jobStore.getJobById(parseInt(route.params.job_id as string))

    if (job.value && job.value.company) {
      currentCompany.value = job.value.company
    }
  }

  authUser.value = await authStore.getAuthUser()
})
</script>

<style scoped>
.detail-btn {
  @apply !bg-green-weak font-bold !py-2 !px-3 hover:border-green-weak hover:!bg-white hover:!text-green-weak;
}
</style>
