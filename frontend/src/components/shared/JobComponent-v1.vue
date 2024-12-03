<template>
  <button class="wrap py-4 px-6 text-left border-2 cursor-default">
    <div class="flex justify-between items-center">
      <div class="flex gap-3 items-center">
        <img
          :src="'test'"
          class="w-11 h-11 object-contain bg-black rounded-full"
          alt="company logo"
        />
        <div class="flex flex-col gap-0 text-left">
          <span class="text-lg font-bold">{{ props.job.title }}</span>
          <div class="flex gap-1">
            <span class="text-sm font-medium leading-none text-gray-strong">
              {{ props.job.company.name }}
            </span>
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
        </div>
      </div>
      <div class="flex gap-2">
        <button>
          <img src="@/assets/icons/favorite.svg" alt="favorite.svg" />
        </button>
        <button class="btn-success-outline" @click="onApply" v-if="false">Apply</button>
        <button class="btn-success-outline" @click="onView">View details</button>
      </div>
    </div>

    <div class="flex gap-1 mt-3" v-if="highlights.length">
      <button
        v-for="item in highlights"
        :key="item"
        :class="Object.keys(WorkTypeMap).includes(item) ? 'work-type' : 'work-setup'"
      >
        <!-- capitalize first letter -->
        {{ item.charAt(0).toUpperCase() + item.slice(1) }}
      </button>
    </div>

    <div class="mt-3 flex flex-col gap-2">
      <span class="text-base text-gray-strong">{{ props.job.description }}</span>
    </div>

    <div class="flex gap-3 mt-5">
      <div class="flex flex-wrap flex-1 text-blue-lt text-sm gap-1">
        <button class="skills">Software developer</button>
        <button class="skills">Java</button>
      </div>
      <span class="text-sm text-pale-gray font-bold whitespace-nowrap">
        {{ 'Posted on ' + new Date(props.job.posted_on).toLocaleDateString() }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { WorkTypeMap, type Company, type Job, type Skill } from '@shared/pack'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
interface Props {
  job: Job<Skill, Company>
}

const highlights = computed(() => {
  return [...props.job.work_setup, ...props.job.work_type]
})

const router = useRouter()
const props = defineProps<Props>()

const onApply = () => {
  router.push({
    name: 'application-form',
    params: {
      job_id: props.job.id
    }
  })
}

const onView = () => {
  router.push({
    name: 'job-details',
    params: {
      id: props.job.id
    }
  })
}
</script>

<style scoped>
.skills {
  @apply border-2 border-blue-lt px-2 py-0.5 rounded-md;
}

.work-setup {
  @apply bg-green-weak text-white text-xs px-2 py-0.5 rounded-full;
}

.work-type {
  @apply border border-gray-strong text-gray-strong text-xs px-2 py-0.5 rounded-full;
}
</style>
