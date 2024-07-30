import { authenticatedApi } from '@/api'
import type { ApiResponse, Company } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCompanyStore = defineStore('company', () => {
  const companies = ref<Company[]>([])

  const fetchCompanies = async () => {
    const res: ApiResponse<{companies: Company[]}> = await authenticatedApi('company/all');
    
    if (res.status == 200) {
      companies.value = res.data.companies
    }
  }

  return {
    companies,
    fetchCompanies
  }
})
