<template>
  <div class="flex gap-2">
    <div class="wrap !p-0 w-full max-w-[350px]">
      <div class="py-7 px-3 flex flex-col gap-4 stick top-0">
        <p class="font-semibold">Messages</p>
        <InputComponent
          name="search_message"
          type="search"
          input-class="!rounded-full"
          placeholder="Search conversations"
        />
      </div>
      <ConversationComponent
        v-for="(convo, ndx) in messageStore.conversations"
        :key="ndx"
        :convo="convo"
      />
      <div class="h-8"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import ConversationComponent from '@/components/messages/ConversationComponent.vue'
import { useMessageStore } from '@/stores/messages'

const messageStore = useMessageStore()
</script>
