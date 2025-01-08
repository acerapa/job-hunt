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
        <span class="text-gray-strong font-bold text-xs">{{ lastUpdate }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span
          class="text-sm text-gray-strong line-clamp-2"
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
            v-if="unread_messages.length"
            class="text-xs px-1.5 font-bold rounded-md text-white bg-main"
            >{{ unread_messages.length }}</span
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface Props {
  convo: Convo
}

const props = defineProps<Props>()

const authStore = useAuthStore()
const conversationStore = useConversationStore()
const lastUpdate = ref<string>()
const interval = ref<number>()

const unread_messages = computed(() =>
  props.convo.messages.filter((m) => !m.is_seen && m.sender.id !== authUser.value?.id)
)

const authUser = ref<User | null>(null)

const calculateLastMessageUpdate = () => {
  if (props.convo.last_message) {
    lastUpdate.value = ''
    const now = new Date()
    const last_message_date = new Date(props.convo.last_message.created_at || new Date())
    const diff = now.getTime() - last_message_date.getTime()

    const toSeconds = Math.floor(diff / 1000)

    if (toSeconds < 60 && toSeconds > 0) {
      lastUpdate.value = `${toSeconds}s ago`
    } else if (toSeconds < 3600 && toSeconds > 61) {
      const minutes = Math.floor(toSeconds / 60)
      lastUpdate.value = `${minutes}m ago`
    } else if (toSeconds < 86400 && toSeconds > 3601) {
      const hours = Math.floor(toSeconds / 3600)
      lastUpdate.value = `${hours}h ago`
    } else if (toSeconds < 604800 && toSeconds > 86401) {
      const days = Math.floor(toSeconds / 86400)
      lastUpdate.value = `${days}d ago`
    } else if (toSeconds < 2419200 && toSeconds > 604801) {
      const weeks = Math.floor(toSeconds / 604800)
      lastUpdate.value = `${weeks}w ago`
    } else if (toSeconds < 28224000 && toSeconds > 2419201) {
      const months = Math.floor(toSeconds / 2822400)
      lastUpdate.value = `${months}m ago`
    } else {
      const years = Math.floor(toSeconds / 28224000)
      if (years > 0) {
        lastUpdate.value = `${years}y ago`
      }
    }
  }
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()

  // run every 1 sencond to update time
  if (props.convo.last_message) {
    interval.value = setInterval(() => {
      calculateLastMessageUpdate()
    }, 5000)
  }
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
})

watch(
  () => props.convo.last_message,
  () => {
    setTimeout(() => {
      calculateLastMessageUpdate()
    }, 200)
  }
)
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
