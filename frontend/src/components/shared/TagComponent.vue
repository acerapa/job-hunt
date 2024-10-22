<template>
  <button class="tag">{{ props.text }}</button>
</template>

<script setup lang="ts">
interface Props {
  text: string
}

const props = defineProps<Props>()
</script>

<style scoped>
.tag {
  @apply text-xxs font-bold text-main border border-main rounded-md px-2 py-0.5;
}
</style>
