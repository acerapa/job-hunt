<template>
  <button
    class="wrap py-4 px-6 text-left border-2"
    :class="props.job.title == 'PHP Developer' ? 'border-green-bright' : ''"
  >
    <div class="flex justify-between items-center">
      <div class="flex gap-3 items-center">
        <img
          :src="props.job.company.image"
          class="w-9 h-9 object-contain bg-black rounded-full"
          alt="company logo"
        />
        <div class="flex flex-col text-left">
          <span class="text-base font-bold">{{ props.job.title }}</span>
          <span class="text-xs font-semibold text-gray-strong">{{ props.job.company.name }}</span>
        </div>
      </div>
      <button>
        <img src="@/assets/icons/favorite.svg" alt="favorite.svg" />
      </button>
    </div>
    <div class="mt-4 flex flex-col gap-2">
      <span class="text-xs font-bold"
        >{{ `${props.job.work_type} - ${props.job.exp_level} - Posted on ${props.job.posted_on}` }}
      </span>
      <span class="text-sm text-gray-strong">{{ props.job.description }}</span>
    </div>

    <div class="flex mt-6 text-blue-lt text-xs">
      <button v-for="(tag, ndx) in props.job.tags" :key="ndx">
        {{ `#${tag.replace(' ', '')}` }}
      </button>
    </div>
  </button>
</template>

<script setup lang="ts">
import { type Job } from '@/types'
// test typings

interface Props {
  job: Job
}

const props = defineProps<Props>()
</script>
