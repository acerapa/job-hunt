<template>
  <div class="flex gap-3 items-end" :class="isCurrent ? 'flex-row-reverse' : ''">
    <img :src="sendBy.image" alt="sender_profile_pic" class="w-7 h-7 rounded-full object-cover" />
    <div
      class="wrap !pb-8 min-w-[100px] max-w-[70%] relative"
      :class="isCurrent ? '!bg-pail-green' : '!bg-pail-blue'"
    >
      <p class="tracking-wide">{{ props.message.text }}</p>
      <small class="text-[10px] font-semibold absolute bottom-2 right-2 text-gray-strong">
        {{ props.message.time.toLocaleTimeString() }} &nbsp;&nbsp;
        <span class="font-bold">&check;</span>
      </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user-store'
import { computed } from 'vue'

const userStore = useUserStore()

interface Message {
  from: number
  text: string
  time: Date
}

interface Sender {
  name: string
  is_active?: boolean
  id: number
  image: string
}

interface Props {
  message: Message
  sender: Sender
}

const props = defineProps<Props>()

const isCurrent = computed(() => {
  return props.message.from == userStore.currentUser.id
})
const sendBy = isCurrent.value ? userStore.currentUser : props.sender
</script>

<style scoped></style>
