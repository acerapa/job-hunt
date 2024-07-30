<template>
  <div class="relative">
    <input
      ref="input"
      v-if="props.type != 'textarea' && props.type != 'select'"
      :type="props.type"
      :name="props.name"
      :id="props.id ? props.id : props.name"
      :placeholder="props.placeholder"
      class="input"
      @input="emit('input')"
      :class="[props.inputClass, props.errorMessage ? '!border-red-400' : '']"
      v-model="value"
    />
    <textarea
      ref="input"
      v-if="props.type == 'textarea'"
      class="input"
      :class="[props.inputClass, props.errorMessage ? '!border-red-400' : '']"
      :name="props.name"
      :id="props.id ? props.id : props.name"
      :placeholder="props.placeholder"
      :rows="props.rows"
      :cols="props.cols"
      @input="onTextAreaInput"
    ></textarea>

    <select
      ref="input"
      v-if="props.type == 'select'"
      :name="props.name"
      :id="props.id ? props.id : props.name"
      :placeholder="props.placeholder"
      class="input"
      :class="[props.inputClass, props.errorMessage ? '!border-red-400' : '']"
      @change="emit('input')"
      v-model="value"
    >
      <option v-if="props.placeholder" value="" hidden>{{ props.placeholder }}</option>
      <option v-for="(opt, ndx) in props.options" :value="opt.value" :key="ndx">
        {{ opt.text }}
      </option>
    </select>
    <small
      class="text-red-400 absolute w-full block"
      :style="{
        top: `${errorMsgTop}px`
      }"
      >{{ props.errorMessage }}</small
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

export interface Props {
  errorMessage?: string
  name: string
  id?: string
  placeholder?: string
  inputClass?: string
  type: string
  rows?: number
  cols?: number
  options?: {
    text: string
    value: string | number | boolean
  }[]
}

const emit = defineEmits(['input'])
const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  cols: 0
})

const value = defineModel()

const input = ref<HTMLElement>()
const errorMsgTop = ref<number>()
onMounted(() => {
  errorMsgTop.value = input.value?.offsetHeight
})

const onTextAreaInput = () => {
  const e = event?.target as HTMLTextAreaElement
  value.value = e.value
  emit('input')
}
</script>
