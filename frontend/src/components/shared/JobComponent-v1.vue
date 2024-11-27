<template>
  <button class="wrap py-4 px-6 text-left border-2">
    <div class="flex justify-between items-center">
      <div class="flex gap-3 items-center">
        <img
          :src="'test'"
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
      <span class="text-xs font-bold">{{ highlighted }} </span>
      <span class="text-sm text-gray-strong">{{ props.job.description }}</span>
    </div>

    <div class="flex mt-6 text-blue-lt text-xs">
      <button v-for="(tag, ndx) in props.job.tags" :key="ndx">
        {{ `#${tag}` }}
      </button>
    </div>
  </button>
</template>

<script setup lang="ts">
import { WorkTypeMap, type Company, type Job, type Skill } from '@shared/pack'
import { computed } from 'vue'

interface Props {
  job: Job<Skill, Company>
}

const props = defineProps<Props>()

const highlighted = computed(() => {
  const highlights: string[] = []

  if (props.job.work_type.length) {
    highlights.push(props.job.work_type.map((type) => WorkTypeMap[type].text).join(', '))
  }

  if (props.job.posted_on) {
    highlights.push(`Posted on ${new Date(props.job.posted_on).toLocaleDateString()}`)
  }
  return highlights.join(' - ')
})
</script>
