<template>
  <div
    class="px-3 py-2 cursor-pointer flex gap-3 items-center hover:bg-green-theme"
    :class="props.convo.active_convo ? 'bg-green-theme' : ''"
  >
    <div class="w-12 h-12 rounded-full relative">
      <img
        class="w-full h-full rounded-full bg-gray-900 object-cover"
        :src="props.convo.receiver.image"
        alt="receiver_image"
      />
      <div class="active-indicator"></div>
    </div>
    <div class="flex flex-col gap-0 flex-1">
      <div class="flex justify-between items-center">
        <p class="text-sm font-bold">{{ props.convo.receiver.name }}</p>
        <span class="text-gray-strong font-bold text-xs">12 min ago</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm italic text-gray-strong">You: This is a sample message</span>
        <div class="flex gap-1 items-center">
          <span
            v-if="props.convo.unread"
            class="text-xs px-1.5 font-bold rounded-md text-white bg-main"
            >{{ props.convo.unread }}</span
          >
          <img v-if="props.convo.is_pinned" src="@/assets/icons/push-pin.png" alt="push-pin.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  convo: {
    unread: number
    is_pinned: boolean
    active_convo: boolean
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
