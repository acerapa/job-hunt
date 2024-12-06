<template>
  <div class="relative flex flex-col">
    <label :class="props.labelCss" :for="props.id ? props.id : props.name" v-if="props.label">{{
      props.label
    }}</label>

    <input
      ref="input"
      :type="props.type"
      :name="props.name"
      v-if="props.type != 'textarea' && props.type != 'select' && props.type != 'wysiwyg'"
      :id="props.id ? props.id : props.name"
      :placeholder="props.placeholder"
      :min="props.min"
      :max="props.max"
      class="input w-full"
      @input="emit('input')"
      :class="[props.inputClass, props.errorMessage ? '!border-red-400' : '']"
      v-model="value"
      :disabled="props.disabled"
    />

    <textarea
      ref="input"
      class="input w-full"
      v-if="props.type == 'textarea'"
      :class="[props.inputClass, props.errorMessage ? '!border-red-400' : '']"
      :name="props.name"
      :id="props.id ? props.id : props.name"
      :placeholder="props.placeholder"
      :rows="props.rows"
      :cols="props.cols"
      v-model="value"
      @input="onTextAreaInput"
      :disabled="props.disabled"
    ></textarea>

    <select
      ref="input"
      :name="props.name"
      v-if="props.type == 'select'"
      :id="props.id ? props.id : props.name"
      :placeholder="props.placeholder"
      class="input w-full"
      :class="[props.inputClass, props.errorMessage ? '!border-red-400' : '']"
      @change="emit('input')"
      v-model="value"
      :disabled="props.disabled"
    >
      <option v-if="props.placeholder" :value="undefined" disabled :selected="true">
        {{ props.placeholder }}
      </option>
      <option v-for="(opt, ndx) in props.options" :value="opt.value" :key="ndx">
        {{ opt.text }}
      </option>
    </select>

    <WysiwygInputComponent
      v-model="value"
      :readonly="props.readonly"
      v-if="props.type == 'wysiwyg'"
      :placeholder="props.placeholder"
    />

    <small class="text-red-400 absolute w-full block -bottom-4" v-if="props.errorMessage">
      {{ props.errorMessage }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import WysiwygInputComponent from './WysiwygInputComponent.vue'

export interface Props {
  errorMessage?: string
  name: string
  id?: string
  placeholder?: string
  inputClass?: string
  type: string
  rows?: number
  cols?: number
  min?: number
  max?: number
  options?: {
    text: string
    value: string | number | boolean
  }[]
  label?: string
  labelCss?: string
  disabled?: boolean
  readonly?: boolean
}

const emit = defineEmits(['input'])
const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  cols: 0,
  disabled: false,
  readonly: false
})

const value = defineModel<any>()

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
