<template>
  <div
    class="px-3 py-2 cursor-pointer flex gap-3 items-center hover:bg-green-theme"
    :class="
      conversationStore.convoDisplay && props.convo.id == conversationStore.convoDisplay.id
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
      <div
        class="status-indicator"
        :class="props.convo.receviers[0].is_active ? 'active-user' : 'inactive-user'"
      ></div>
    </div>
    <div class="flex flex-col gap-0 flex-1">
      <div class="flex justify-between items-center">
        <p class="text-sm font-bold text-ellipsis overflow-hidden text-nowrap">
          {{ props.convo.receviers[0].full_name }}
        </p>
        <span class="text-gray-strong font-bold text-xs">12 min ago</span>
      </div>
      <div class="flex justify-between items-center">
        <span
          class="text-sm italic text-gray-strong line-clamp-2"
          :class="
            !props.convo.last_message.is_seen &&
            authUser?.id !== props.convo?.last_message.sender.id
              ? 'font-bold'
              : 'font-normal'
          "
          v-if="props.convo.last_message"
        >
          {{
            authUser && authUser.id === props.convo.last_message.sender.id
              ? 'You'
              : props.convo.receviers[0].full_name.split(' ')[0]
          }}: {{ props.convo.last_message.message }}
        </span>
        <div class="flex gap-1 items-center">
          <span
            v-if="props.convo.unread_messages_number"
            class="text-xs px-1.5 font-bold rounded-md text-white bg-main"
            >{{ props.convo.unread_messages_number }}</span
          >
          <img v-if="props.convo.is_pinned" src="@/assets/icons/push-pin.png" alt="push-pin.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth-store'
import { useConversationStore } from '@/stores/conversation-store'
import type { Convo } from '@/types'
import type { User } from '@shared/pack'
import { onMounted, ref } from 'vue'

interface Props {
  convo: Convo
}

const props = defineProps<Props>()

const authStore = useAuthStore()
const conversationStore = useConversationStore()

const authUser = ref<User | null>(null)

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
})
</script>

<style scoped>
.status-indicator {
  @apply w-3 h-3 bg-green-bright border border-white rounded-full absolute bottom-0 right-0;
}

.active-user {
  @apply bg-green-bright;
}

.inactive-user {
  @apply bg-gray-strong;
}
</style>
