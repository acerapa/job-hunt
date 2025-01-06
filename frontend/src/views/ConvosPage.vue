<template>
  <div class="wrap !p-0 w-full flex-1 flex flex-col h-[calc(100vh_-_134px)]">
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
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { useConversationStore } from '@/stores/conversation-store'
import type { User } from '@shared/pack'
import { onMounted, ref } from 'vue'

import InputComponent from '@/components/shared/InputComponent.vue'
import ConversationComponent from '@/components/messages/ConversationComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const conversationStore = useConversationStore()

const authUser = ref<User | null>()

const onSelectConvo = (id: number) => {
  router.push({
    name: 'messages',
    query: { id: id.toString() }
  })
}

onMounted(async () => {
  authUser.value = await authStore.getAuthUser()
  if (authUser.value) {
    await conversationStore.getConvoDisplays(authUser.value.id)

    console.log(conversationStore.convoDisplays)
  }
})
</script>
