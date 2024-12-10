<template>
  <div
    class="px-3 py-2 cursor-pointer flex gap-3 items-center hover:bg-green-theme"
    :class="
      conversationStore.conversation && props.convo.id == conversationStore.conversation.id
        ? 'bg-green-theme'
        : ''
    "
  >
    <div class="w-12 h-12 rounded-full relative">
      <img
        class="w-full h-full rounded-full bg-gray-900 object-cover"
        src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="receiver_image"
      />
      <div class="active-indicator"></div>
    </div>
    <div class="flex flex-col gap-0 flex-1">
      <div class="flex justify-between items-center">
        <p class="text-sm font-bold">
          {{ `${props.convo.receviers[0].first_name} ${props.convo.receviers[0].last_name}` }}
        </p>
        <span class="text-gray-strong font-bold text-xs">12 min ago</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm italic text-gray-strong" v-if="props.convo.last_message">
          You: This is a sample message
        </span>
        <div class="flex gap-1 items-center">
          <span
            v-if="props.convo.unread_messages"
            class="text-xs px-1.5 font-bold rounded-md text-white bg-main"
            >{{ props.convo.unread_messages }}</span
          >
          <img v-if="props.convo.is_pinned" src="@/assets/icons/push-pin.png" alt="push-pin.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useConversationStore } from '@/stores/conversation-store'
import type { Convo } from '@/types'

interface Props {
  convo: Convo
}

const props = defineProps<Props>()

const conversationStore = useConversationStore()
</script>

<style scoped>
.active-indicator {
  @apply w-3 h-3 bg-green-bright border border-white rounded-full absolute bottom-0 right-0;
}
</style>
