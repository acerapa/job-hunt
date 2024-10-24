<template>
  <div class="flex gap-4 h-[100vh_-_134px]">
    <div class="flex max-w-[500px] w-full flex-col">
      <div class="wrap text-white !bg-green-bright !px-6 !py-2">
        <p class="font-bold">Applied and Liked jobs</p>
        <p class="text-sm leading-tight mt-1">
          Browse the jobs you applied and check the status. Also plan your next job to apply from
          your likes.
        </p>
        <div class="flex gap-3 mt-3 items-center">
          <InputComponent type="select" name="type" class="w-32" />
          <div class="bg-white rounded-md flex-1 flex gap-1 items-center pr-1">
            <InputComponent
              type="text"
              name="type"
              placeholder="Search"
              class="flex-1"
              input-class="border-none"
            />
            <button
              class="btn !bg-green-bright hover:!bg-white hover:!border-green-bright hover:!text-green-bright"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 mt-6">
        <div class="wrap"></div>
      </div>
    </div>
    <div class="wrap flex flex-1 w-full"></div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
</script>
