<template>
  <div
    class="grid grid-cols-8 gap-3 items-center odd:bg-tint-green px-4 py-3"
    @mouseenter="isRowFocused = true"
    @mouseleave="updateRowState"
  >
    <div class="col-span-4">
      <p class="">{{ props.row.title }}</p>
    </div>
    <div class="col-span-1 px-4">
      <p
        class="w-7 h-7 pt-0.5 rounded-full border border-vivid-blue text-center text-vivid-blue font-bold"
      >
        {{ props.row.hunters }}
      </p>
    </div>
    <div class="col-span-1">
      <p class="w-fit px-2 rounded-md font-bold" :class="StatusMap[props.row.status].class">
        {{ StatusMap[props.row.status].text }}
      </p>
    </div>
    <div class="col-span-1">{{ props.row.added_on.toLocaleDateString() }}</div>
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
import { JobViewStatus, type JobView } from '@/types'
import { onMounted, ref } from 'vue'

interface Props {
  row: JobView
}

const isShowMenu = ref<boolean>(false)
const isRowFocused = ref<boolean>(false)

const updateRowState = () => {
  isShowMenu.value = false
  isRowFocused.value = false
}

// MAP
const StatusMap = {
  [JobViewStatus.ACTIVE]: {
    text: 'active',
    class: 'text-sm border-2 border-vibrant-green text-vibrant-green'
  },
  [JobViewStatus.CLOSE]: {
    text: 'close',
    class: 'text-sm border-2 border-gray-strong text-gray-strong'
  }
}

const props = defineProps<Props>()

onMounted(() => {})
</script>
