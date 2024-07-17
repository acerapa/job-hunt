<template>
  <div class="w-[350px] p-4 rounded-xl border-2 border-light-green flex flex-col gap-2">
    <p class="text-base font-semibold text-main">{{ props.item.title }}</p>
    <p class="text-sm">{{ props.item.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '@shared/pack'
interface Props {
  item: Job
}

const props = defineProps<Props>()
</script>
