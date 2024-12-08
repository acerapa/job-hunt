<template>
  <div
    class="grid grid-cols-8 gap-3 items-center odd:bg-tint-green px-4 py-3"
    @mouseenter="isRowFocused = true"
    @mouseleave="updateRowState"
    v-if="jobStore.job"
  >
    <div class="col-span-2">
      <p>{{ props.row.profile.user.first_name + ' ' + props.row.profile.user.last_name }}</p>
    </div>
    <div class="col-span-2">
      <p>{{ jobStore.job.title }}</p>
    </div>
    <div class="col-span-2">
      <p
        class="w-fit px-2 rounded-md font-bold"
        :class="ApplicantStatusMap[props.row.status].class"
      >
        {{ ApplicantStatusMap[props.row.status].text }}
      </p>
    </div>
    <div class="col-span-1">
      <span v-if="props.row.created_at">
        {{ new Date(props.row.created_at).toLocaleDateString() }}
      </span>
    </div>
    <div class="relative">
      <button @click="isShowMenu = true" class="col-span-1 w-fit ml-4">
        <img src="@/assets/icons/menu.png" alt="menu.png" />
      </button>
      <div
        class="wrap shadow-lg w-fit absolute top-1/2 -left-16 z-20"
        v-if="isRowFocused && isShowMenu"
      >
        Testing
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJobStore } from '@/stores/job-store'
import {
  ApplicationStatus,
  type Application,
  type Job,
  type Profile,
  type User
} from '@shared/pack'
import { ref } from 'vue'

interface Props {
  row: Application<Job, Profile<User>, object>
}

const props = defineProps<Props>()

const jobStore = useJobStore()

const ApplicantStatusMap = {
  [ApplicationStatus.UNREVIEWED]: {
    class: 'text-sm pending !border-2',
    text: 'unreviewed'
  },
  [ApplicationStatus.REVIEWED]: {
    class: 'text-sm reviewed !border-2',
    text: 'reviewed'
  },
  [ApplicationStatus.INTERVIEWING]: {
    class: 'text-sm interviewing !border-2',
    text: 'interviewing'
  },
  [ApplicationStatus.DECLINED]: {
    class: 'text-sm declined !border-2',
    text: 'declined'
  },
  [ApplicationStatus.OFFERED]: {
    class: 'text-sm offered !border-2',
    text: 'offered'
  }
}

const isShowMenu = ref<boolean>(false)
const isRowFocused = ref<boolean>(false)

const updateRowState = () => {
  isRowFocused.value = false
  isShowMenu.value = false
}
</script>
