<template>
  <div class="wrap !pt-0">
    <div class="flex justify-between items-center sticky top-0 bg-white pt-4 pb-4">
      <div>
        <span class="text-xl block font-bold" :class="props.job.title ? '' : 'text-pale-gray'">
          {{ props.job.title || 'Job Title' }}
        </span>
        <div class="flex gap-2 items-center" v-if="currentCompany">
          <span class="text-sm text-gray-strong font-medium">{{ currentCompany.name }}</span>
          <div class="flex gap-1">
            <img src="@/assets/icons/pixel-star.svg" alt="pixel-star" v-for="ndx in 5" :key="ndx" />
          </div>
        </div>
      </div>
      <button
        v-if="props.state == JobDescriptionState.VIEWING"
        class="btn !bg-blue-bright font-bold hover:text-blue-bright hover:border-blue-bright hover:!bg-white"
        @click="onApply()"
      >
        Apply now
      </button>
    </div>
    <div class="px-2 mt-3 flex flex-col gap-3">
      <div class="flex gap-2 items-center">
        <img src="@/assets/icons/map-pin.png" alt="map-pin.png" />
        <span class="text-xs text-gray-strong"></span>
      </div>
      <div class="flex gap-2 items-center" v-if="props.job.work_type && props.job.work_type.length">
        <img src="@/assets/icons/clock.png" alt="clock.png" />
        <span class="text-xs text-gray-strong">
          {{ props.job.work_type.map((type) => WorkTypeMap[type].text).join(', ') }}
        </span>
      </div>
      <div
        class="flex gap-2 items-center"
        v-if="props.job.work_setup && props.job.work_setup.length"
      >
        <img src="@/assets/icons/office.png" alt="office.png" />
        <span class="text-xs text-gray-strong">
          {{ props.job.work_setup.map((setup) => WorkSetupMap[setup].text).join(', ') }}
        </span>
      </div>
      <div class="flex gap-2 items-center" v-if="props.job.salary_range">
        <img src="@/assets/icons/money-bag.png" alt="money-bag.png" />
        <span class="text-xs text-gray-strong">{{ props.job.salary_range }}</span>
      </div>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">Job Description</p>
      <p
        class="mt-4 font-normal text-sm text-justify"
        :class="props.job.description ? '' : 'text-pale-gray'"
      >
        {{ props.job.description || 'This is a job description' }}
      </p>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">Key Responsibilities</p>
      <ul
        class="pl-8 text-sm flex flex-col gap-3"
        :class="props.job.responsibilities ? '' : 'text-pale-gray'"
      >
        {{
          props.job.responsibilities || 'Enumerate key responsibilities here'
        }}
      </ul>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">Qualifications</p>
      <ul
        class="pl-8 text-sm flex flex-col gap-3"
        :class="props.job.qualifications ? '' : 'text-pale-gray'"
      >
        {{
          props.job.qualifications || 'Enumerate key qualifications here'
        }}
      </ul>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">What we offer</p>
      <ul
        class="pl-8 text-sm flex flex-col gap-3"
        :class="props.job.what_we_offer ? '' : 'text-pale-gray'"
      >
        {{
          props.job.what_we_offer || 'Enumerate key qualifications here'
        }}
      </ul>
    </div>
    <div class="mt-10">
      <p class="text-sm font-medium">Others</p>
      <ul
        class="pl-8 text-sm flex flex-col gap-3"
        :class="props.job.others ? '' : 'text-pale-gray'"
      >
        {{
          props.job.others || 'Enumerate Other related infos here'
        }}
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  WorkSetupMap,
  WorkTypeMap,
  type Company,
  type Job,
  type Profile,
  type Skill,
  type User
} from '@shared/pack'
import { useRouter } from 'vue-router'
import { JobDescriptionState } from '@/const/enum'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'

interface Props {
  job: Partial<Job<Skill, Company>>
  state?: JobDescriptionState
}

const props = withDefaults(defineProps<Props>(), {
  state: JobDescriptionState.VIEWING
})
const router = useRouter()

const onApply = () => {
  router.push({
    name: 'application-form',
    params: {
      job_id: props.job.id
    }
  })
}

const authUser = ref<User<Profile, Company> | null>(null)
const currentCompany = ref<Company | null>(null)

// setting current company from props
if (props.job.company) {
  currentCompany.value = props.job.company
}

const authStore = useAuthStore()

onMounted(async () => {
  if (props.state == JobDescriptionState.EDITING) {
    authUser.value = await authStore.getAuthUser()
    if (authUser.value && authUser.value.company) {
      currentCompany.value = authUser.value?.company
    }
  }
})
</script>
