<template>
  <button
    :disabled="props.disabled"
    :class="props.disabled ? 'pointer-events-none' : ''"
    class="tag"
  >
    <p>{{ props.text }}</p>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})
</script>

<style scoped>
.tag {
  @apply w-fit text-main border border-main rounded-md px-3 py-1.5;
}

.tag p {
  @apply text-xs font-bold;
}

.tag:hover {
  @apply bg-main text-white;
}
</style>
