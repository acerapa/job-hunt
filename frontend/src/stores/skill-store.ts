import { api, Method } from '@/api'
import type { ApiResponse, Skill } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSkillStore = defineStore('skill', function () {
  const skills = ref<Skill[]>([])
  const skill = ref<Skill | null>(null)

  const createSkill = async (skill: Partial<Skill>) => {
    const res = await api(`skills/create`, Method.POST, skill)

    return res.status
  }

  const fetchSkills = async () => {
    const res: ApiResponse<Skill[]> = await api(`skills/all`)

    if (res.status === 200) {
      skills.value = res.data
    }
  }

  const getSkills = async (): Promise<Skill[]> => {
    if (!skills.value.length) {
      await fetchSkills()
    }

    return skills.value
  }

  return {
    skills,
    skill,
    createSkill,
    fetchSkills,
    getSkills
  }
})
