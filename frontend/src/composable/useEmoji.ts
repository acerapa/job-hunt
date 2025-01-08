import type { Emoji } from '@/types'
import { ref } from 'vue'

export const useEmoji = () => {
  const emojis = ref<Emoji[]>([])

  const fetchEmojis = async () => {
    const response = await fetch(`https://emojihub.yurace.pro/api/all`)
    const data: Emoji[] = await response.json()

    if (data.length) {
      emojis.value = data
    }
  }

  return {
    emojis,
    fetchEmojis
  }
}
