<template>
  <div :ref="`trigger-${props.id}`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { type SelectOptions } from '@shared/pack'
export interface Props {
  options: SelectOptions[]
  id: string // should be unique if used in the same page
}

const props = defineProps<Props>()

console.log(props.options)
</script>
