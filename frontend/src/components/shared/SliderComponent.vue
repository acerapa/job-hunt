<template>
  <div class="flex gap-3 items-center justify-center">
    <button class="slider-btn">
      <img src="@/assets/images/back-to.png" alt="back-to" />
    </button>
    <div class="slides">
      <component
        :is="props.slideComponent"
        v-for="(item, ndx) in props.data"
        :item="item"
        :key="ndx"
      ></component>
    </div>
    <button class="slider-btn">
      <img src="@/assets/images/next-to.png" alt="next-to" />
    </button>
  </div>
  <code>Slider component is currently in progress</code>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

export type SliderProps = {
  panel: number
  hasButtons?: boolean
  slideComponent: object
  data: object
}

const props = withDefaults(defineProps<SliderProps>(), {
  hasButtons: true
})

onMounted(() => {})
</script>

<style scoped>
.slider-btn {
  @apply flex-1 max-w-9 max-h-9 min-w-9 min-h-9;
}

.slides {
  @apply max-w-[90%] w-auto flex gap-3 justify-center overflow-hidden;
}

@keyframes slide-in-from-right {
  100% {
    margin-right: 0;
  }
}

@-webkit-keyframes slide-in-from-right {
  100% {
    margin-right: 0;
  }
}
</style>
