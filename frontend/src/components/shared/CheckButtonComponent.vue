<template>
  <label :for="props.id" class="relative cursor-pointer">
    <input
      :id="props.id"
      type="checkbox"
      v-model="model"
      :name="props.name"
      :value="props.value"
      class="peer top-0 absolute z-0 invisible"
    />
    <div class="font-bold px-2 py-1">
      <p class="bg-transparent text-transparent">{{ props.label }}</p>
    </div>
    <div
      class="top-0 absolute text-nowrap text-green-bright peer-checked:bg-green-bright peer-checked:border-green-bright peer-checked:text-white text-sm font-bold px-2 py-1 rounded-md border border-gray-strong"
    >
      {{ props.label }}
    </div>
  </label>
</template>

<script setup lang="ts">
interface Props {
  id: string
  name: string
  label: string
  value: string | number
}

const props = defineProps<Props>()
const model = defineModel()
</script>

<style scoped>
.check-btn {
  @apply border border-green-bright bg-green-bright text-white px-3 py-1.5 rounded-md font-bold cursor-pointer;
}

.check-btn-outline {
  @apply text-green-bright border border-pale-gray px-3 py-2 rounded-md font-bold cursor-pointer;
}
</style>
