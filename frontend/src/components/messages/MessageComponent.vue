<template>
  <div
    class="flex gap-3 items-end"
    :class="isCurrent ? 'flex-row-reverse' : ''"
    v-if="authUser"
    ref="msg"
  >
    <img
      src="https://images.unsplash.com/photo-1611200945005-403b70229452?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="sender_profile_pic"
      class="w-7 h-7 rounded-full object-cover"
    />
    <div
      class="wrap !pb-8 min-w-[100px] max-w-[70%] relative"
      :class="isCurrent ? '!bg-pale-green' : '!bg-pale-blue'"
    >
      <p class="tracking-wide">{{ props.message.message }}</p>
      <small class="text-[10px] flex font-semibold absolute bottom-2 right-2 text-gray-strong">
        {{ new Date(props.message.created_at ?? '').toLocaleTimeString() }} &nbsp;&nbsp;
        <div>
          <span class="font-bold">&check;</span>
          <span class="font-bold -ml-1" v-if="props.message.is_seen">&check;</span>
        </div>
      </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCheckVisibility } from '@/composable/useCheckVisibility'
import { useSocket } from '@/composable/useSocket'
import { useAuthStore } from '@/stores/auth-store'
import { useConversationStore } from '@/stores/conversation-store'
import type { Message, User } from '@shared/pack'
import { computed, inject, onMounted, ref, type Ref } from 'vue'

interface Props {
  message: Message<Object, User>
}

const authStore = useAuthStore()
const authUser = ref<User | null>()
const { sendSeen, connect } = useSocket()
const { startObserver } = useCheckVisibility()
const conversationStore = useConversationStore()

const props = defineProps<Props>()

const isCurrent = computed(() => {
  const sender_id = props.message?.sender_id || props.message.sender.id
  return sender_id == authUser.value?.id
})

const msg = ref()
const messagesCont = inject('messagesCont') as Ref<HTMLElement>
onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
  if (authUser.value) {
    connect(authUser.value.id)
  }

  if (authUser.value?.id != props.message.sender.id) {
    setTimeout(() => {
      if (messagesCont.value && msg.value) {
        startObserver(messagesCont.value, msg.value, async (is_seen: boolean) => {
          if (is_seen && !props.message.is_seen) {
            await conversationStore.updateMessage(props.message.id, { is_seen: true })
            const msg = { ...props.message }

            if (!msg.conversation) {
              msg.conversation = { id: conversationStore.convoDisplay?.id || 0 }
            }

            sendSeen(msg)
          }
        })
      }
    }, 100)
  }
})
</script>

<style scoped></style>
