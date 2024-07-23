<template>
  <div class="relative">
    <input
      :type="props.type"
      :name="props.name"
      :id="props.id ? props.id : props.name"
      :placeholder="props.placeholder"
      class="input"
      @input="emit('input')"
      :class="[props.inputClass, props.errorMessage ? '!border-red-400' : '']"
      v-model="value"
    />
    <small class="text-red-400 absolute -bottom-[18px] w-full block">{{
      props.errorMessage
    }}</small>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  errorMessage?: string
  name: string
  id?: string
  placeholder?: string
  inputClass?: string
  type: string
}
const emit = defineEmits(['input'])
const props = defineProps<Props>()

const value = defineModel()
</script>
