import { api, Method } from '@/api'
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

  const updateProfileSkill = async (id: number, skills: number[]) => {
    const res = await api(`profile/${id}/skills`, Method.POST, { skills })

    return res.status < 400
  }

  return {
    profile,
    fetchProfileById,
    updateProfileSkill
  }
})
