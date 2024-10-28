<template>
  <div class="flex flex-col gap-4">
    <div class="wrap !bg-green-bright text-white flex justify-between items-start">
      <div>
        <p class="text-2xl font-semibold">Find the best fit for the Job rule</p>
        <span>Start by creating jobs and feel free to select the candidate who apply/hunt.</span>
      </div>
      <button class="btn-white-outline shadow shadow-white">Create Job</button>
    </div>
    <TableComponent
      title="My recent activities"
      :has-pagination="true"
      :headers="TableHeader"
      :row="TableRow"
      :data="data"
    />
  </div>
</template>

<script setup lang="ts">
import TableComponent from '@/components/shared/TableComponent.vue'
import TableHeader from '@/components/dashboard/TableHeader.vue'
import TableRow from '@/components/dashboard/TableRow.vue'
import { type Activity } from '@/types'

const data: Activity[] = [
  {
    type: 'Job',
    status: 'active',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    type: 'Job',
    status: 'active',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    type: 'Job',
    status: 'active',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  }
]
</script>
