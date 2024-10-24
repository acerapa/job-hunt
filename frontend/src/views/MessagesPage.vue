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
          :disabled="!messageStore.conversations.length"
        />
      </div>
      <div v-if="messageStore.conversations.length">
        <ConversationComponent
          v-for="(convo, ndx) in messageStore.conversations"
          :key="ndx"
          :convo="convo"
          @click="onSelectConvo(ndx)"
        />
      </div>
      <div
        v-if="!messageStore.conversations.length"
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
    <div v-if="conversation" class="wrap flex flex-col !py-0 flex-1 h-[calc(100vh_-_134px)]">
      <div
        class="py-4 px-4 -mx-4 border-b-2 border-green-theme flex items-center justify-between sticky top-0"
      >
        <div class="flex gap-3 items-center">
          <img
            :src="conversation.receiver.image"
            class="w-12 h-12 rounded-full object-cover"
            alt="receiver_profile_pic"
          />
          <div class="flex flex-col gap-0">
            <span class="font-semibold text-base leading-tight">
              {{ conversation.receiver.name }}
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
          :sender="conversation.receiver"
          v-for="message in conversation.messages"
          :key="message"
          :message="message"
        />
      </div>
      <div class="px-4 -mx-4 border-t-2 border-green-theme py-3 flex gap-2 items-start">
        <InputComponent
          type="textarea"
          name="message-box"
          class="flex-1"
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
import { useMessageStore } from '@/stores/messages'
import { ref } from 'vue'

const messageStore = useMessageStore()

const conversation = ref()

const onSelectConvo = (ndx: number) => {
  messageStore.conversations = messageStore.conversations.map((convo) => {
    convo.active_convo = false
    return convo
  })

  conversation.value = messageStore.conversations[ndx]
  conversation.value.active_convo = true
}
</script>
