import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const currentPage = ref<string>()

  const setCurrentPage = (page: string) => (currentPage.value = page)
  const getCurrentPage = () => currentPage.value

  return {
    currentPage,
    getCurrentPage,
    setCurrentPage
  }
})
