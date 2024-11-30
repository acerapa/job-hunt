<template>
  <ShiftModal v-model="showShiftModal" v-if="showShiftModal" :id="props.row.id" />
  <ConfirmationModal
    v-model="showConfirmationModal"
    v-if="showConfirmationModal"
    confirmation-text="This action is irreversible. Do you want to continue?"
    @confirm="deleteShift"
  />
  <div
    class="grid grid-cols-6 gap-3 items-center odd:bg-tint-green px-4 py-3"
    @mouseenter="isRowFocused = true"
    @mouseleave="updateRowState"
  >
    <p class="col-span-2">{{ props.row.name }}</p>
    <p class="col-span-1">{{ props.row.start_time }}</p>
    <p class="col-span-1">{{ props.row.end_time }}</p>
    <p class="col-span-1">
      <span
        class="text-sm font-semibold rounded px-2 border-2 py-1"
        :class="
          props.row.is_default
            ? 'border-blue-bright text-blue-bright'
            : 'border-gray-strong text-gray-strong'
        "
        >{{ props.row.is_default ? 'default' : 'custom' }}</span
      >
    </p>
    <div class="relative text-center">
      <button @click="isShowMenu = true" class="col-span-1 w-fit ml-4">
        <img src="@/assets/icons/menu.png" alt="menu.png" />
      </button>
      <div
        class="wrap shadow-lg w-fit absolute top-1/2 left-0 z-20 flex flex-col gap-1 !px-0"
        v-if="isRowFocused && isShowMenu"
      >
        <button class="py-1 font-bold hover:bg-blue-50 px-4" @click="showShiftModal = true">
          View shift
        </button>
        <button
          class="py-1 text-red-500 font-bold hover:bg-blue-50 px-4"
          v-if="!props.row.is_default"
          @click="showConfirmationModal = true"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Company, Shift } from '@shared/pack'
import ShiftModal from './ShiftModal.vue'
import ConfirmationModal from '../shared/ConfirmationModal.vue'
import { useCompanyStore } from '@/stores/company-store'

interface Props {
  row: Shift<Object, Company>
}

const props = defineProps<Props>()

const isShowMenu = ref<boolean>(false)
const isRowFocused = ref<boolean>(false)
const showShiftModal = ref<boolean>(false)
const showConfirmationModal = ref<boolean>(false)

const companyStore = useCompanyStore()

const updateRowState = () => {
  isRowFocused.value = false
  isShowMenu.value = false
}

const deleteShift = async () => {
  if (props.row.id) {
    const status = await companyStore.deleteShift(props.row.id)

    if (status) {
      showConfirmationModal.value = false

      if (props.row.company) {
        await companyStore.getCompanyShifts(props.row.company.id)
      }
    }
  }
}
</script>
