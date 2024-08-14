<template>
  <div class="flex mt-6 flex-col gap-5">
    <div class="flex justify-between items-center">
      <p class="font-bold text-2xl">Jobs</p>
      <div class="flex gap-3">
        <button class="btn-outline">Cancel</button>
        <button class="btn">Create</button>
      </div>
    </div>
    <div class="wrapper">
      <p class="text-base">Filter</p>
      <div class="flex gap-3">
        <InputComponent name="position" type="text" placeholder="Position" />
        <button class="btn">Search</button>
      </div>
    </div>
    <div class="wrapper">
      <TableComponent :title="tableConfig.title" :columns="tableConfig.columns" :data="[]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputComponent from '@/components/shared/InputComponent.vue'
import TableComponent from '@/components/shared/TableComponent.vue'

const tableConfig = {
  title: 'Jobs',
  columns: [
    {
      order: 1,
      name: 'id',
      col_span: 1,
      data_key: 'id'
    },
    {
      order: 2,
      name: 'Title',
      col_span: 2,
      data_key: 'title'
    },
    {
      order: 3,
      name: 'Description',
      col_span: 3,
      data_key: 'description'
    },
    {
      order: 4,
      name: 'Appy to',
      col_span: 2,
      data_key: 'application_url'
    },
    {
      order: 5,
      name: 'Status',
      col_span: 1,
      data_key: 'status'
    },
    {
      order: 6,
      name: 'Posted on',
      col_span: 2,
      data_key: 'posted_on'
    },
    {
      order: 7,
      name: 'Created At',
      col_span: 2,
      data_key: 'created_at'
    }
  ]
}
</script>

<style scoped></style>
