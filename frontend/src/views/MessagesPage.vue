<template>
  <div class="flex gap-2">
    <div class="wrap !p-0 w-full flex flex-col max-w-[350px] h-[calc(100vh_-_134px)]">
      <div class="py-7 px-3 flex flex-col gap-4 stick top-0">
        <p class="font-semibold">Messages</p>
        <InputComponent
          name="search_message"
          type="search"
          input-class="!rounded-full"
          placeholder="Search conversations"
          @focus="onFocus"
          :disabled="!convoDisplay.length"
        />
      </div>
      <div v-if="convoDisplay.length">
        <ConversationComponent
          v-for="convo in convoDisplay"
          :key="convo.id"
          :convo="convo"
          @click="onSelectConvo(convo.id)"
        />
      </div>
      <div v-if="!convoDisplay.length" class="flex justify-center items-center flex-1">
        <div>
          <p class="text-center text-base font-semibold">Nothing to show, no contacts yet.</p>
          <p class="text-xs text-center font-semibold text-gray-strong w-72">
            You'll receive contacts whenever the Job Provider will contact you.
          </p>
        </div>
      </div>
    </div>
    <div v-if="conversation" class="wrap flex flex-col !py-0 flex-1 h-[calc(100vh_-_134px)]">
      <div
        class="py-4 px-4 -mx-4 border-b-2 border-green-theme flex items-center justify-between sticky top-0"
        v-if="receviers"
      >
        <div class="flex gap-3 items-center">
          <img
            :src="conversation.receiver.image"
            class="w-12 h-12 rounded-full object-cover"
            alt="receiver_profile_pic"
          />
          <div class="flex flex-col gap-0">
            <span class="font-semibold text-base leading-tight">
              {{ `${receviers[0].first_name} ${receviers[0].last_name}` }}
            </span>
            <span class="font-semibold text-xs text-green-bright">Active Now</span>
          </div>
        </div>
        <div class="flex gap-6">
          <button class="relative">
            <img src="@/assets/icons/account.png" alt="account.png" />
            <span
              class="absolute -top-2 -right-2 leading-none bg-main text-white py-1 px-1 text-xs font-bold rounded-md"
              >2</span
            >
          </button>
          <button>
            <img src="@/assets/icons/settings.png" alt="settings.png" />
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4 mt-3 flex-1">
        <MessageComponent
          v-for="message in conversationStore.messages"
          :key="message.id"
          :message="message"
        />
      </div>
      <div class="px-4 -mx-4 border-t-2 border-green-theme py-3 flex gap-2 items-start">
        <InputComponent
          class="flex-1"
          type="textarea"
          name="message-box"
          input-class="!rounded-md"
          placeholder="Type a message..."
        />
        <button class="btn">send</button>
      </div>
    </div>
    <div
      v-if="!conversation"
      class="h-[calc(100vh_-_134px)] flex justify-center items-center flex-1"
    >
      <div class="flex flex-col items-center justify-center">
        <img src="@/assets/icons/messages.png" alt="messages.png" />
        <p class="font-semibold w-60 text-center">Please select a contact to show conversation.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConversationComponent from '@/components/messages/ConversationComponent.vue'
import MessageComponent from '@/components/messages/MessageComponent.vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import { useSocket } from '@/composable/useSocket'
import { useMessageStore } from '@/stores/messages'
import { useConversationStore } from '@/stores/conversation-store'
import { computed, onMounted, ref } from 'vue'
import type { Convo } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import type { User } from '@shared/pack'

const { sendMessage } = useSocket()

const authStore = useAuthStore()
const messageStore = useMessageStore()
const conversationStore = useConversationStore()

const conversation = ref()
const authUser = ref<User | null>()

const receviers = computed(() => {
  return conversationStore.conversation?.members.filter(
    (member) => member.id !== authUser.value?.id
  )
})

const convoDisplay = computed(() => {
  return conversationStore.conversations.map((convo): Convo => {
    return {
      id: convo.id,
      is_pinned: convo.is_pinned,
      receviers: convo.members.filter((member) => member.id !== authUser.value?.id),
      sender: convo.members.find((member) => member.id !== authUser.value?.id) as User,
      last_message: convo.messages ? convo.messages[convo.messages.length - 1] : undefined,
      unread_messages: convo.messages ? convo.messages.filter((msg) => !msg.is_seen).length : 0
    }
  })
})

const onSelectConvo = async (id: number) => {
  conversationStore.getConversationById(id)

  await conversationStore.fetchMessages(conversationStore.conversation?.id as number)

  conversation.value = messageStore.conversations[0]
}

const onFocus = () => {
  sendMessage({
    conversation_id: conversationStore.conversation?.id,
    message: 'Search input is focused',
    is_seen: false,
    sender_id: authUser.value?.id
  })
}

onMounted(async () => {
  await conversationStore.fetchConversations()
  authUser.value = await authStore.getAuthUser()
})
</script>
