import { api, authenticatedApi, Method } from '@/api'
import type { Address, ApiResponse, Company } from '@shared/pack'
import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', () => {
  const registerCompany = async (
    company: { company: Partial<Company>; address: Partial<Address> },
    user_id: number
  ): Promise<ApiResponse> => {
    return await authenticatedApi(`users/${user_id}/company/register`, Method.POST, company)
  }

  const updateCompany = async (company: Partial<Company>, id: number) => {
    await api(`users/company/update/${id}`, Method.POST, company)
  }

  const updateComapnyAddress = async (address: Partial<Address>, id: number) => {
    await api(`users/company/update/${id}/address`, Method.POST, address)
  }

  return {
    updateCompany,
    registerCompany,
    updateComapnyAddress
  }
})
