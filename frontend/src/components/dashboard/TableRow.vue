<template>
  <div class="grid grid-cols-8 gap-3 px-4 py-3 odd:bg-tint-green">
    <p class="col-span-1 text-sm font-medium">{{ props.row.type }}</p>
    <p class="col-span-1 text-sm font-medium">{{ props.row.status }}</p>
    <p class="col-span-5 text-sm font-medium">{{ props.row.description }}</p>
    <p class="col-span-1 text-sm font-medium">{{ 'comming soon' }}</p>
  </div>
</template>

<script setup lang="ts">
import { type Activity } from '@/types'

const props = defineProps<{ row: Activity }>()
</script>
