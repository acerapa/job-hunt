<template>
  <div>
    <TableComponent
      title="List of Applicants"
      :has-add-new="false"
      :has-pagination="true"
      :row="PApplicationListRow"
      :data="jobStore.applicants"
    >
      <template v-slot:table-header>
        <div class="grid grid-cols-8 gap-3 text-sm">
          <p class="col-span-2 font-bold text-main">NAME</p>
          <p class="col-span-3 font-bold text-main">JOB</p>
          <p class="col-span-1 font-bold text-main">STATUS</p>
          <p class="col-span-1 font-bold text-main">APPLIED ON</p>
          <p class="col-span-1 font-bold text-main">ACTIONS</p>
        </div>
      </template>
    </TableComponent>
  </div>
</template>

<script setup lang="ts">
import TableComponent from '@/components/shared/TableComponent.vue'
import PApplicationListRow from '@/components/application/PApplicationListRow.vue'
import { useJobStore } from '@/stores/job-store'

const jobStore = useJobStore()
</script>
