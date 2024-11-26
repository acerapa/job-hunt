<template>
  <div class="flex gap-4">
    <div class="max-w-[550px] w-full h-full max-h-[calc(100vh_-_134px)] flex flex-col gap-4">
      <div class="wrap text-white !bg-green-bright sticky top-0">
        <p class="text-2xl font-semibold">Create Job Posting</p>
      </div>
      <div class="wrap !py-0 flex flex-col gap-3 h-full overflow-y-auto thin-scrollbar">
        <div
          class="flex pt-4 gap-3 pb-3 justify-center items-center font-bold sticky top-0 bg-white z-10"
        >
          <button
            class="step-item"
            @click="step = Step.STEP1"
            :class="step === Step.STEP1 ? 'active-item' : ''"
          >
            1
          </button>
          <button
            class="step-item"
            @click="step = Step.STEP2"
            :class="step === Step.STEP2 ? 'active-item' : ''"
          >
            2
          </button>
        </div>

        <!-- step 1 -->
        <FormStep1
          v-if="step === Step.STEP1"
          v-model="jobModel"
          v-model:model-errors="modelErrors"
        />
        <FormStep2
          v-if="step === Step.STEP2"
          v-model="jobModel"
          v-model:model-errors="modelErrors"
        />
        <!-- step 2 -->
        <div class="step-2 flex flex-col gap-3"></div>
        <div class="flex gap-3 justify-center sticky bottom-0 bg-white py-3">
          <button class="btn-outline" v-if="step === Step.STEP1">Cancel</button>
          <button class="btn-outline" v-if="step === Step.STEP2" @click="onBack">Back</button>
          <button class="btn-outline">Save as draft</button>
          <button class="btn" @click="onContinue" v-if="step !== Step.STEP2">Continue</button>
          <button class="btn" @click="onSubmit" v-if="step !== Step.STEP1">Save</button>
        </div>
      </div>
    </div>
    <div class="h-full max-h-[calc(100vh_-_134px)] overflow-y-auto thin-scrollbar flex-1">
      <JobDescription :job="jobModel" :state="JobDescriptionState.EDITING" />
    </div>
  </div>
</template>

<script setup lang="ts">
import JobDescription from '@/components/shared/JobDescription.vue'
import FormStep1 from '@/components/job-creation/FormStep1.vue'
import FormStep2 from '@/components/job-creation/FormStep2.vue'
import { onMounted, ref } from 'vue'
import {
  JobStatus,
  type Address,
  type Company,
  type Job,
  type Profile,
  type User
} from '@shared/pack'
import { JobDescriptionState } from '@/const/enum'
import { useJobStore } from '@/stores/job-store'
import { useAuthStore } from '@/stores/auth-store'

enum Step {
  STEP1 = 1,
  STEP2 = 2
}

const jobStore = useJobStore()
const authStore = useAuthStore()

const modelErrors = ref<Partial<Job & Address>>({})
const authUser = ref<User<Profile, Company> | null>(null)
const jobModel = ref<Partial<Job<Address>>>({
  work_setup: [],
  work_type: [],
  address: {},
  status: JobStatus.OPEN
})

const step = ref<Step>(Step.STEP1)

const onContinue = () => {
  step.value = Step.STEP2
}

const onBack = () => {
  step.value = Step.STEP1
}

const onSubmit = async () => {
  if (authUser.value && authUser.value.company) {
    await jobStore.createJob(jobModel.value, authUser.value.company.id)
  }

  // TODO: Upon receiving error when creating show a toast message
  // might need to create your own toast component
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
})
</script>

<style scoped>
.step-item {
  @apply text-main border border-main w-8 h-8 rounded-full;
}

.active-item {
  @apply !text-white !bg-main;
}
</style>
