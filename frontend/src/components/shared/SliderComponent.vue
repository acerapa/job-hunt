<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-center justify-center w-full">
      <button class="slider-btn" @click="changePanel(SlideDirection.LEFT)">
        <img src="@/assets/images/back-to.png" alt="back-to" />
      </button>
      <div class="slides">
        <div
          class="panel"
          v-for="n in range(numberOfSlides)"
          :key="n"
          :class="currentSlide == n ? 'flex' : 'hidden'"
        >
          <component
            :is="props.slideComponent"
            v-for="(item, ndx) in mappedData[n]"
            :item="item"
            :key="ndx"
          ></component>
        </div>
      </div>
      <button class="slider-btn" @click="changePanel(SlideDirection.RIGHT)">
        <img src="@/assets/images/next-to.png" alt="next-to" />
      </button>
    </div>
    <div class="active-dots">
      <div
        class="dot"
        :class="panel == currentSlide ? 'active' : ''"
        v-for="panel in range(numberOfSlides)"
        :key="panel"
        @click="currentSlide = panel"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { SlideDirection, range } from '@shared/pack'

export type SliderProps = {
  panel: number
  hasButtons?: boolean
  slideComponent: object
  data: object[]
  isInfinity?: boolean
  duration?: number
}

const props = withDefaults(defineProps<SliderProps>(), {
  hasButtons: true,
  isInfinity: false,
  duration: 5
})

const currentSlide = ref(0)
const numberOfSlides = ref<number>(Math.ceil(props.data.length / props.panel))

const mappedData = computed(() => {
  const copyData = [...props.data]
  const mapData: Array<Array<Object>> = []

  range(numberOfSlides.value).forEach(() => {
    let temporalStore = copyData.splice(0, props.panel)
    if (temporalStore.length != props.panel) {
      if (mapData.length > 0) {
        const borrow = mapData[mapData.length - 1].slice(-(props.panel - temporalStore.length))
        temporalStore = [...borrow, ...temporalStore]
      }
    }
    mapData.push(temporalStore)
  })

  return mapData
})

const changePanel = (direction: SlideDirection) => {
  switch (direction) {
    case SlideDirection.LEFT:
      if (currentSlide.value > 0) {
        currentSlide.value = currentSlide.value - 1
      } else {
        if (props.isInfinity) {
          currentSlide.value = numberOfSlides.value - 1
        }
      }
      break
    case SlideDirection.RIGHT:
      if (currentSlide.value < numberOfSlides.value - 1) {
        currentSlide.value = currentSlide.value + 1
      } else {
        if (props.isInfinity) {
          currentSlide.value = 0
        }
      }
      break
  }
}

onMounted(() => {})
</script>

<style scoped>
.slider-btn {
  @apply flex-1 max-w-9 max-h-9 min-w-9 min-h-9;
}

.slides {
  @apply max-w-[90%] w-auto flex gap-3 items-center overflow-hidden;
}

.active-dots {
  @apply flex gap-2 justify-center;
}

.active-dots .dot {
  @apply rounded-full border border-gray-500 w-2 h-2 cursor-pointer;
}

.active-dots .dot.active {
  @apply bg-main border-main;
}

.panel {
  @apply gap-3;
  animation: fade-in 2s forwards;
}
</style>
