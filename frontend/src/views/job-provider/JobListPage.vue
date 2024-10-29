<template>
  <div>
    <TableComponent
      title="List of Jobs"
      :has-pagination="true"
      :data="data"
      :row="PJobListRow"
      @on-new="onNew"
    >
      <template v-slot:table-header>
        <div class="grid grid-cols-8 gap-3 text-sm">
          <p class="col-span-4 font-bold text-main">TITLE</p>
          <p class="col-span-1 font-bold text-main">JOB HUNTERS</p>
          <p class="col-span-1 font-bold text-main">STATUS</p>
          <p class="col-span-1 font-bold text-main">ADDED ON</p>
          <p class="col-span-1 font-bold text-main">ACTIONS</p>
        </div>
      </template>
    </TableComponent>
  </div>
</template>

<script setup lang="ts">
import TableComponent from '@/components/shared/TableComponent.vue'
import PJobListRow from '@/components/job-list/PJobListRow.vue'
import { JobViewStatus, type JobView } from '@/types'
import { useRouter } from 'vue-router'

const router = useRouter()
const data: JobView[] = [
  {
    title: 'PHP Developer',
    hunters: 34,
    added_on: new Date(),
    status: JobViewStatus.ACTIVE
  },
  {
    title: 'Frontend Developer',
    hunters: 23,
    added_on: new Date(),
    status: JobViewStatus.ACTIVE
  },
  {
    title: 'Backend Developer',
    hunters: 4,
    added_on: new Date(),
    status: JobViewStatus.CLOSE
  }
]

const onNew = () => {
  router.push({
    name: 'provider-jobs-create'
  })
}
</script>
