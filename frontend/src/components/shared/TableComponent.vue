<template>
  <div class="wrap flex flex-col gap-3">
    <div class="flex justify-between">
      <p class="font-semibold text-lg table-title" :class="props.titleStyle">{{ props.title }}</p>
      <button v-if="props.hasAddNew" class="btn-success" @click="emit('onNew')">Add new</button>
    </div>
    <div class="flex justify-between py-3">
      <InputComponent
        type="seach"
        name="search"
        placeholder="&#128269; Search a job"
        class="text-sm"
        input-class="!rounded-lg !bg-tint-gray !border-none"
      />

      <div class="flex gap-3">
        <InputComponent
          type="select"
          :options="[]"
          name="filter_by"
          input-class="text-sm !bg-tint-gray !border-none"
          placeholder="Filter By"
          v-model="tools.filter_by"
        />
        <InputComponent
          type="select"
          :options="[]"
          name="sort_by"
          input-class="text-sm !bg-tint-gray !border-none"
          placeholder="Sort By"
          v-model="tools.sort_by"
        />
      </div>
    </div>
    <div class="border-y-2 border-green-theme px-4 py-3 text-base font-semibold">
      <div v-if="props.headers">
        <component :is="props.headers"></component>
      </div>
      <div v-else>
        <slot name="table-header"></slot>
      </div>
    </div>
    <div class="mt-1" v-if="props.data && props.data.length">
      <div v-if="props.row">
        <component
          v-for="row in props.data"
          v-bind="{ row }"
          :key="row"
          :is="props.row"
        ></component>
      </div>
      <div v-else>
        <slot name="table-body"></slot>
      </div>
    </div>
    <div v-else>
      <p class="text-center">No Data!</p>
    </div>
    <div class="mt-1 border-t-2 border-green-theme pt-3" v-if="props.hasPagination">
      <div v-if="props.pagination">
        <component :is="props.pagination"></component>
      </div>
      <PaginationComponent v-else />
    </div>
    <div v-else>
      <slot name="table-pagination"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Component } from 'vue'
import InputComponent from './InputComponent.vue'
import PaginationComponent from './PaginationComponent.vue'

const emit = defineEmits(['onNew'])

interface Tools {
  sort_by: string
  filter_by: string
}

interface Props<T> {
  title?: string
  titleStyle?: string
  hasAddNew?: boolean
  headers?: Component
  row?: Component
  pagination?: Component
  hasPagination?: boolean
  data?: T[]
}

const tools = ref<Tools>({ filter_by: '', sort_by: '' })

const props = withDefaults(defineProps<Props<any>>(), {
  hasAddNew: true
})
</script>

<style scoped></style>
