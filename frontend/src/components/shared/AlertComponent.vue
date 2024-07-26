<template>
  <div
    class="px-3 top-0 py-2 absolute z-50 w-full alert"
    :class="alertConfig[props.status].style"
    @animationend="emit('animetion-end')"
  >
    <span class="float-end cursor-pointer">&times;</span>
    <p class="text-center">{{ props.messsage }}</p>
  </div>
</template>

<script setup lang="ts">
import { AlertStatus } from '@shared/pack/index'

export interface Props {
  messsage: string
  status: AlertStatus
}

const emit = defineEmits(['animetion-end'])

const alertConfig = {
  [AlertStatus.SUCCESS]: {
    style: 'bg-green-600 text-white'
  },
  [AlertStatus.FAILED]: {
    style: 'bg-red-600 text-white'
  }
}

const props = defineProps<Props>()
</script>

<style scoped>
.alert {
  animation: fade-in 2s forwards;
}
</style>
