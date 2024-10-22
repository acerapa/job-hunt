<template>
  <div class="px-3 py-2 bg-green-theme">
    <div class="w-10 h-10 relative">
      <img class="w-10 h-10 rounded-full" :src="props.convo.receiver.image" alt="receiver_image" />
      <div class="active-indicator"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  convo: {
    receiver: {
      name: string
      is_active: boolean
      id: number
      image: string
    }
    sender: {
      name: string
      is_active: boolean
      id: number
    }
    messages: {
      from: number
      text: string
      time: Date
    }[]
  }
}

const props = defineProps<Props>()
</script>

<style scoped>
.active-indicator {
  @apply w-3 h-3 bg-green-bright border border-white rounded-full absolute bottom-0 right-0;
}
</style>
