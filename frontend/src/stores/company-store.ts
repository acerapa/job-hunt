import { authenticatedApi, Method } from '@/api'
import type { ApiResponse, Company } from '@shared/pack'
import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', () => {
  const registerCompany = async (
    company: Partial<Company>,
    user_id: number
  ): Promise<ApiResponse> => {
    return await authenticatedApi(`users/${user_id}/company/register`, Method.POST, company)
  }

  return {
    registerCompany
  }
})
