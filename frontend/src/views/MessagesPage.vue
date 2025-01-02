<template>
  <div class="flex gap-2">
    <div class="wrap !p-0 w-full flex-1 flex flex-col max-w-[350px] h-[calc(100vh_-_134px)]">
      <div class="py-7 px-3 flex flex-col gap-4 stick top-0">
        <p class="font-semibold">Messages</p>
        <InputComponent
          name="search_message"
          type="search"
          input-class="!rounded-full"
          placeholder="Search conversations"
          :disabled="!conversationStore.convoDisplays.length"
        />
      </div>
      <div v-if="conversationStore.convoDisplays.length">
        <ConversationComponent
          v-for="convo in conversationStore.convoDisplays"
          :key="convo.id"
          :convo="convo"
          @click="onSelectConvo(convo.id)"
        />
      </div>
      <div
        v-if="!conversationStore.convoDisplays.length"
        class="flex justify-center items-center flex-1"
      >
        <div>
          <p class="text-center text-base font-semibold">Nothing to show, no contacts yet.</p>
          <p class="text-xs text-center font-semibold text-gray-strong w-72">
            You'll receive contacts whenever the Job Provider will contact you.
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="conversationStore.convoDisplays && conversationStore.convoDisplay"
      class="wrap flex flex-col min-w-[562px] !py-0 flex-1 h-[calc(100vh_-_134px)]"
    >
      <div
        class="py-4 px-4 -mx-4 border-b-2 border-green-theme flex items-center justify-between sticky top-0"
        v-if="conversationStore.convoDisplay.receviers"
      >
        <div class="flex gap-3 items-center">
          <img
            src="https://images.unsplash.com/photo-1611200945005-403b70229452?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            class="w-12 h-12 rounded-full object-cover"
            alt="receiver_profile_pic"
          />
          <div class="flex flex-col gap-0">
            <span class="font-semibold text-base leading-tight">
              {{ conversationStore.convoDisplay.receviers[0].full_name }}
            </span>
            <span
              class="font-semibold text-xs"
              :class="
                conversationStore.convoDisplay.receviers[0].is_active
                  ? 'text-green-bright'
                  : 'text-gray-strong'
              "
            >
              {{ conversationStore.convoDisplay.receviers[0].is_active ? 'Active Now' : 'Offline' }}
            </span>
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
      <div class="flex flex-col-reverse gap-4 my-3 flex-1 overflow-y-auto thin-scrollbar">
        <MessageComponent
          v-for="message in conversationStore.convoDisplay.messages"
          :key="message.id"
          :message="message"
        />
      </div>
      <div class="px-4 -mx-4 border-t-2 border-green-theme py-3 flex gap-2 items-start">
        <InputComponent
          class="flex-1"
          type="textarea"
          v-model="message"
          name="message-box"
          input-class="!rounded-md"
          placeholder="Type a message..."
        />
        <button class="btn" @click="onSendMessage">send</button>
      </div>
    </div>
    <div
      v-if="!conversationStore.convoDisplays || !conversationStore.convoDisplay"
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
import { useConversationStore } from '@/stores/conversation-store'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import type { Message, User } from '@shared/pack'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { sendMessage, connect } = useSocket()
const conversationStore = useConversationStore()

const message = ref<string>()
const authUser = ref<User | null>()

const onSelectConvo = (id: number) => {
  router.push({
    name: 'messages',
    query: { id }
  })

  conversationStore.getConvoDisplayById(id)

  // get unread messages and set read to true
  if (authUser.value) {
    conversationStore.readMessages(authUser.value?.id)
  }
}

const onSendMessage = async () => {
  let data: Partial<Message<Object, User>> = {
    is_seen: false,
    message: message.value,
    sender_id: authUser.value?.id,
    conversation_id: conversationStore.convoDisplay ? conversationStore.convoDisplay.id : 0
  }
  const msg = await conversationStore.saveMessage(data)

  if (msg) {
    sendMessage(msg)
  }

  message.value = ''
}

onMounted(async () => {
  await conversationStore.fetchConversations()
  authUser.value = await authStore.getAuthUser()

  if (authUser.value) {
    connect(authUser.value.id)
    conversationStore.getConvoDisplays(authUser.value.id)
  }

  if (route.query.id) {
    conversationStore.getConvoDisplayById(parseInt(route.query.id as string))
  }
})
</script>
