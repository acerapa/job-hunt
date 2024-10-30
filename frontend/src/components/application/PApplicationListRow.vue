<template>
  <div
    class="grid grid-cols-8 gap-3 items-center odd:bg-tint-green px-4 py-3"
    @mouseenter="isRowFocused = true"
    @mouseleave="updateRowState"
  >
    <div class="col-span-2">
      <p>{{ props.row.name }}</p>
    </div>
    <div class="col-span-3">
      <p>{{ props.row.job }}</p>
    </div>
    <div class="col-span-1">
      <p
        class="w-fit px-2 rounded-md font-bold"
        :class="ApplicantStatusMap[props.row.status].class"
      >
        {{ ApplicantStatusMap[props.row.status].text }}
      </p>
    </div>
    <div class="col-span-1">{{ props.row.applied_on.toLocaleDateString() }}</div>
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
import { ApplicantStatus, type Applicant } from '@/types'
import { ref } from 'vue'

interface Props {
  row: Applicant
}

const props = defineProps<Props>()

const ApplicantStatusMap = {
  [ApplicantStatus.PENDING]: {
    class: 'text-sm pending !border-2',
    text: 'pending'
  },
  [ApplicantStatus.REVIEWED]: {
    class: 'text-sm reviewed !border-2',
    text: 'reviewed'
  },
  [ApplicantStatus.INTERVIEWING]: {
    class: 'text-sm interviewing !border-2',
    text: 'interviewing'
  },
  [ApplicantStatus.DECLINED]: {
    class: 'text-sm declined !border-2',
    text: 'declined'
  },
  [ApplicantStatus.OFFERED]: {
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
