<template>
  <ModelComponent
    :title="title"
    v-model="showModal"
    @save="onSave"
    :has-save-btn="!isDefault"
    :close-btn-text="isDefault ? 'Close' : 'Cancel'"
  >
    <div class="flex flex-col gap-4">
      <InputComponent
        type="text"
        name="name"
        label="Shift name"
        label-css="text-sm"
        v-model="model.name"
        :disabled="isDefault"
        placeholder="Shift name"
      />
      <div class="flex gap-3 items-center">
        <InputComponent
          type="time"
          name="start_time"
          label="Start time"
          label-css="text-sm"
          :disabled="isDefault"
          placeholder="Start time"
          v-model="model.start_time"
        />
        <InputComponent
          type="time"
          name="end_time"
          label="End time"
          label-css="text-sm"
          :disabled="isDefault"
          placeholder="End time"
          v-model="model.end_time"
        />
      </div>
    </div>
  </ModelComponent>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import InputComponent from '../shared/InputComponent.vue'
import ModelComponent from '@/components/shared/ModelComponent.vue'
import type { Company, Shift } from '@shared/pack'
import { useCompanyStore } from '@/stores/company-store'
import { useAuthStore } from '@/stores/auth-store'

const showModal = defineModel()

interface Props {
  id?: number
}

const props = defineProps<Props>()
const currentCompany = ref<Company>()
const title = props.id ? 'Edit shift' : 'Add new shift'
const model = ref<Partial<Shift>>({})
const isDefault = computed(() => (props.id && model.value.is_default ? true : false))

const companyStore = useCompanyStore()
const authStore = useAuthStore()

const onSave = async () => {
  let status: number = 0
  if (currentCompany.value) {
    if (!props.id) {
      status = await companyStore.registerShift(model.value, currentCompany.value.id)
    } else {
      status = await companyStore.updateShift(model.value, props.id)
    }

    await companyStore.fetchCompanyShifts(currentCompany.value.id)
  }

  if (status && status == 200) {
    showModal.value = false
  }
}

onMounted(async () => {
  if (props.id) {
    const shift = await companyStore.getShiftById(props.id)

    if (shift) {
      model.value = shift
    }
  }

  const authUser = await authStore.getAuthUser()
  if (authUser && authUser.company) {
    currentCompany.value = authUser.company
  }
})
</script>
