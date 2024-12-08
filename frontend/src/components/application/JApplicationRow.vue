<template>
  <div
    class="grid grid-cols-6 gap-3 odd:bg-tint-green px-4 py-3 items-center"
    @mouseenter="isRowFocused = true"
    @mouseleave="updateRowState"
  >
    <p class="col-span-2">{{ props.row.job.title }}</p>
    <p class="col-span-2">{{ props.row.job.company.name }}</p>
    <div class="col-span-1">
      <p class="col-span-1" :class="ApplicationStatusMap[props.row.status].class">
        {{ ApplicationStatusMap[props.row.status].text }}
      </p>
    </div>
    <div class="col-span-1 flex gap-2 relative">
      <button @click="isShowMenu = true" class="col-span-1 w-fit ml-4">
        <img src="@/assets/icons/menu.png" alt="menu.png" />
      </button>
      <div
        class="wrap shadow-lg w-fit absolute top-1/2 -left-16 z-20 flex flex-col gap-1 !px-0"
        v-if="isRowFocused && isShowMenu"
      >
        <RouterLink :to="'#'" class="py-1 font-medium hover:bg-blue-50 px-4"
          >View Application</RouterLink
        >
        <RouterLink :to="'#'" class="py-1 font-medium hover:bg-blue-50 px-4"
          >Send Message</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ApplicationStatusMap,
  type Application,
  type Company,
  type Job,
  type Profile
} from '@shared/pack'
import { ref } from 'vue'

interface Props {
  row: Application<Job<Object, Company>, Profile>
}

const isShowMenu = ref(false)
const isRowFocused = ref(false)

const updateRowState = () => {
  isShowMenu.value = false
  isRowFocused.value = false
}

const props = defineProps<Props>()
</script>
