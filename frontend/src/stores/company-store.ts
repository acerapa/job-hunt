import { api, authenticatedApi, Method } from '@/api'
import type { Address, ApiResponse, Company, Shift } from '@shared/pack'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCompanyStore = defineStore('company', () => {
  const shifts = ref<Shift[]>([])
  const shift = ref<Shift | null>(null)

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

  const fetchCompanyShifts = async (company_id: number) => {
    const res: ApiResponse<Shift[]> = await api(`settings/company/${company_id}/shifts`)

    if (res.status == 200) {
      shifts.value = res.data
    }
  }

  const getCompanyShifts = async (company_id: number) => {
    if (!shifts.value.length) {
      await fetchCompanyShifts(company_id)
    }

    return shifts.value
  }

  const registerShift = async (shift: Partial<Shift>, company_id: number): Promise<number> => {
    const res = await api(`users/company/${company_id}/shift/register`, Method.POST, shift)

    return res.status
  }

  const updateShift = async (shift: Partial<Shift>, id: number) => {
    const res = await api(`settings/company/shifts/${id}/update`, Method.POST, shift)

    return res.status
  }

  const fetchCompanyShiftById = async (id: number) => {
    const res: ApiResponse<Shift> = await api(`settings/company/shifts/${id}`)

    if (res.status == 200) {
      shift.value = res.data
    }
  }

  const getShiftById = async (id: number): Promise<Shift | null> => {
    shift.value = shifts.value.find((shift) => shift.id == id) ?? null

    if (!shift.value) {
      await fetchCompanyShiftById(id)
    }

    return shift.value
  }

  return {
    shifts,
    updateShift,
    getShiftById,
    updateCompany,
    registerShift,
    registerCompany,
    getCompanyShifts,
    fetchCompanyShifts,
    updateComapnyAddress,
    fetchCompanyShiftById
  }
})
