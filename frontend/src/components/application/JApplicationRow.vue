<template>
  <div class="grid grid-cols-6 gap-3 odd:bg-tint-green px-4 py-3">
    <p class="col-span-2">{{ props.row.job.title }}</p>
    <p class="col-span-2">{{ props.row.job.company.name }}</p>
    <div class="col-span-1">
      <p class="col-span-1" :class="ApplicationStatusMap[props.row.status].class">
        {{ ApplicationStatusMap[props.row.status].text }}
      </p>
    </div>
    <div class="col-span-1">Some actions here</div>
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

interface Props {
  row: Application<Job<Object, Company>, Profile>
}

const props = defineProps<Props>()
</script>
