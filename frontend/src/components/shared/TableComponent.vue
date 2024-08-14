<template>
  <div class="table">
    <div class="table-options">
      <div class="flex gap-3 items-center">
        <p class="text-base font-medium">{{ props.title }}</p>
        <DropdownTrigger id="job-table-column-dropdown" :options="columnOptions">
          <InputComponent
            id="column-dropdown"
            type="text"
            name="column-dropdown"
            placeholder="Show Columns"
          />
        </DropdownTrigger>
      </div>
      <div class="flex gap-3">
        <button>
          <img src="@/assets/icons/list-icon.png" alt="list-icon.png" />
        </button>
        <button>
          <img src="@/assets/icons/gird-icon.png" alt="gird-icon.png" />
        </button>
      </div>
    </div>
    <div class="mt-5 flex flex-col gap-5">
      <component v-if="tableColumnHeader" :is="tableColumnHeader"></component>
      <component v-if="tableRow" :is="tableRow"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DropdownTrigger from '../special/Dropdown/DropdownTrigger.vue'
import InputComponent from './InputComponent.vue'
import type { SelectOptions } from '@shared/pack'

const columnOptions = ref<SelectOptions[]>([])

export interface Props {
  title: string
  data: object[]
  tableRow?: object[]
  tableColumnHeader?: object[]
}

const props = defineProps<Props>()
</script>

<style scoped>
.table {
  width: 100%;
}

.table-options {
  gap: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-column-header {
  font-size: 16px;
  font-weight: bold;
}
</style>
