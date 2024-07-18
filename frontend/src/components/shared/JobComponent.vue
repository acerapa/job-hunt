<template>
  <div class="job-component">
    <p class="text-base font-semibold text-main">{{ props.item.title }}</p>
    <p class="text-sm">{{ props.item.description }}</p>
    <div class="company">
      <!-- src here can should come from props  -->
      <img src="@/assets/images/sample-company-logo.png" class="logo" alt="sample-company-logo" />
      <p class="text-sm font-semibold">{{ props.item.company.name }}</p>
      <div class="ratings">
        <img 
          :src="rating <= props.item.company.ratings ? StartFilled : StarOutlined" 
          :alt="rating.toString()"
          v-for="rating in 5" 
          :key="rating" />
      </div>
    </div>
    <div class="tags">
      <button class="tag" v-for="(tag, ndx) in props.item.tags" :key="ndx">{{ tag }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '@shared/pack'
import StartFilled from '@/assets/images/star-filled.png'
import StarOutlined from '@/assets/images/star-outlined.png'

interface Props {
  item: Job
}
const props = defineProps<Props>()

</script>

<style scoped>
.job-component {
  @apply w-[350px] p-4 rounded-xl border-2 border-light-green flex flex-col gap-2 cursor-pointer;
}

.company {
  @apply flex gap-2 items-center;
}

.company .logo {
  @apply border border-sub-light-green rounded-full;
}

.company .ratings {
  @apply flex gap-1;
}

.tags {
  @apply flex flex-1 gap-2 items-center flex-wrap;
}

.tags .tag {
  @apply rounded-md border border-sub-light-green px-2 py-1 text-xs text-main;
}
</style>
