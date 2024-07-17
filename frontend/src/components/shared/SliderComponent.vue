<template>
  <div class="flex gap-3 items-center">
    <button>
      <img src="@/assets/images/back-to.png" alt="back-to" />
    </button>
    <div class="slides" ref="slides">
      <!-- just testing -->
      <slot></slot>
    </div>
    <button>
      <img src="@/assets/images/next-to.png" alt="next-to" />
    </button>
  </div>
  <code>Slider component is currently in progress</code>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

export type SliderProps = {
  panel: number
  hasButtons: boolean
}

const props = withDefaults(defineProps<SliderProps>(), {
  hasButtons: true
})

const slides = ref()
const panels = ref<HTMLCollection>()
onMounted(() => {
  if ((slides.value as HTMLElement).children.length) {
    panels.value = (slides.value as HTMLElement).children
  }
})
</script>

<style scoped>
.slides {
  @apply flex-1 flex gap-3 justify-center;
}

.slides > * {
  @apply border overflow-hidden;
}
</style>
