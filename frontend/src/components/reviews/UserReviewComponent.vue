<template>
  <div class="review-component">
    <img src="@/assets/images/looking-for-job.png" class="user-profile" alt="looking-for-job" />
    <div>
      <p class="italic tracking-wider text-base">"{{ props.item.content }}"</p>
      <small class="italic text-right">-Anonymous</small>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  item: {
    img?: string
    content: string
    person?: object
  }
}

const props = defineProps<Props>()
console.log(props)
</script>

<style scoped>
.review-component {
  @apply bg-main text-white py-6 px-4 rounded-xl flex gap-3 max-w-[650px] items-center;
}

.review-component .user-profile {
  @apply bg-white rounded-full w-full h-[200px] max-w-[200px] max-h-[200px];
}
</style>
