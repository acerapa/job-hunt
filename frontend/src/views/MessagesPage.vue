<template>
  <GrabMessageFileComponent v-model="showGrabMessageFileModal" v-if="showGrabMessageFileModal" />
  <div class="flex gap-2">
    <div
      class="wrap !p-0 w-full flex-1 flex flex-col max-w-[350px] h-[calc(100vh_-_134px)] max-[600px]:hidden"
    >
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
      class="wrap flex flex-col max-[600px]:min-w-0 lg:min-w-[562px] md:min-w-[450px] flex-1 !py-0 h-[calc(100vh_-_134px)]"
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
      <div
        class="flex flex-col-reverse gap-4 my-3 flex-1 overflow-y-auto thin-scrollbar"
        ref="messagesCont"
      >
        <MessageComponent
          v-for="message in conversationStore.convoDisplay.messages"
          :key="message.id"
          :message="message"
        />
      </div>
      <div class="px-4 -mx-4 relative border-t-2 border-green-theme py-3 flex gap-2 items-start">
        <div class="flex-1 relative">
          <p
            v-if="memberTyping.length"
            class="absolute -top-5 left-1/2 -translate-x-1/2 text-nowrap text-sm bg-gray-100 text-gray-500 px-2 rounded"
          >
            {{ memberTyping.map((m) => m.user?.first_name).join(', ') }} typing...
          </p>
          <InputComponent
            class="flex-1"
            type="textarea"
            v-model="message"
            name="message-box"
            @input="onInputMessage"
            input-class="!rounded-md"
            placeholder="Type a message..."
          />
          <div
            v-if="showEmojis"
            @click.stop
            class="wrap !pt-0 absolute max-w-96 max-h-60 shadow bottom-6 right-8 overflow-auto no-scrollbar"
          >
            <div class="sticky top-0 bg-white pb-3 pt-4">
              <InputComponent
                type="search"
                name="emoji_search"
                v-model="searchEmojiText"
                placeholder="Search emoji"
                input-class="!rounded-full text-sm"
              />
            </div>
            <div class="flex gap-1 flex-wrap text-center justify-between">
              <button
                class="text-2xl"
                :key="emoji.name"
                :title="emoji.name"
                v-html="emoji.htmlCode[0]"
                v-for="emoji in emojisFiltered"
                @click.stop="onEmojiClick(emoji)"
              ></button>
            </div>
          </div>
          <div class="bg-transparent absolute bottom-0 right-0">
            <button class="text-2xl group" @click.stop="showGrabMessageFileModal = true">
              <div class="relative">
                <span class="group-hover:hidden">📁</span>
                <span class="hidden group-hover:block">📂</span>
              </div>
            </button>
            <button class="text-2xl group" @click.stop="onShowEmojis">
              <div class="relative">
                <span class="group-hover:hidden">&#128578;</span>
                <span class="hidden group-hover:block">&#128522;</span>
              </div>
            </button>
          </div>
        </div>
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
import InputComponent from '@/components/shared/InputComponent.vue'
import MessageComponent from '@/components/messages/MessageComponent.vue'
import ConversationComponent from '@/components/messages/ConversationComponent.vue'
import GrabMessageFileComponent from '@/components/messages/GrabMessageFileComponent.vue'

import { useSocket } from '@/composable/useSocket'
import { useConversationStore } from '@/stores/conversation-store'
import { computed, onMounted, provide, ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import type { File, Message, User } from '@shared/pack'
import { useRoute, useRouter } from 'vue-router'
import type { ConvoMember, Emoji } from '@/types'
import { useEmoji } from '@/composable/useEmoji'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { fetchEmojis, emojis } = useEmoji()
const conversationStore = useConversationStore()
const { sendMessage, connect, sendTyping } = useSocket()

const message = ref<string>()
const authUser = ref<User | null>()

const searchEmojiText = ref('')
const showEmojis = ref<boolean>(false)
const showGrabMessageFileModal = ref<boolean>(false)

const memberTyping = computed(() => {
  return (conversationStore.convoDisplay?.receviers as ConvoMember[]).filter(
    (member) => member.is_typing
  )
})

const onSelectConvo = (id: number) => {
  router.push({
    name: 'messages',
    query: { id }
  })

  conversationStore.getConvoDisplayById(id)
}

const emojisFiltered = computed(() => {
  return emojis.value.filter((emoji) => {
    const searchCondition = `${emoji.name} ${emoji.category} ${emoji.group}`.toLowerCase()

    return searchEmojiText.value
      ? searchCondition.includes(searchEmojiText.value.toLowerCase())
      : emoji
  })
})

/** **************************
 * METHODS
 *****************************/

let timeout: number
const onInputMessage = () => {
  // send typing event to socket server
  const data = {
    convo_id: conversationStore.convoDisplay?.id || 0,
    sender_id: authUser.value?.id || 0
  }

  sendTyping(data, true)

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    // send typing event to socket server
    sendTyping(data, false)
  }, 1000)
}

const onShowEmojis = () => {
  showEmojis.value = !showEmojis.value
  if (showEmojis.value) {
    window.addEventListener('click', () => onShowEmojis(), { once: true })
  }
}

const onEmojiClick = (emoji: Emoji) => {
  if (!message.value) {
    message.value = ''
  }
  message.value =
    message.value + String.fromCodePoint(parseInt(emoji.unicode[0].replace('U+', ''), 16))
}

const onSendMessage = async () => {
  let data: Partial<Message<Object, User, File>> = {
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

/** **************************
 * LIFE CYCLE HOOKS
 *****************************/
const messagesCont = ref<HTMLElement>()
provide('messagesCont', messagesCont)
onMounted(async () => {
  await conversationStore.fetchConversations()
  authUser.value = await authStore.getAuthUser()

  await fetchEmojis()

  if (authUser.value) {
    connect(authUser.value.id)
    await conversationStore.getConvoDisplays(authUser.value.id)
  }

  if (route.query.id) {
    onSelectConvo(Number(route.query.id))
  }
})
</script>
