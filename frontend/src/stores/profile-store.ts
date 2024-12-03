import { api } from '@/api'
import type { ApiResponse, Application, Profile } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile>()

  const fetchProfileById = async (id: number) => {
    const res: ApiResponse<Profile<Object, Object, Application>> = await api(`profile/${id}`)

    if (res.status == 200) {
      profile.value = res.data
    }
  }

  return {
    profile,
    fetchProfileById
  }
})
