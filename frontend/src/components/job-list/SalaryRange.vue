<template>
  <div class="flex flex-col">
    <span class="font-semibold text-xs">Salary</span>
    <InputComponent
      name="salary-range"
      type="range"
      :min="props.min"
      :max="props.max"
      v-model="value"
      input-class="!px-0 w-full"
    />
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'

interface Props {
  min: number
  max: number
}

const props = defineProps<Props>()

const value = defineModel()
</script>
