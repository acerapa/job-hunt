<template>
  <div
    class="wrap max-w-[200px] w-full px-4 h-fit sticky max-h-[calc(100vh_-_134px)] overflow-y-auto thin-scrollbar"
  >
    <div class="sticky -top-4 z-20 bg-white -mx-4 -mt-4 px-4 pt-4">
      <div class="flex justify-between items-center">
        <span class="font-semibold text-base">Filters</span>
        <button class="text-xs text-blue-bright">clear all</button>
      </div>
      <hr class="my-4 -mx-4 border-green-theme" />
    </div>
    <SalaryRange :min="0" :max="20000" />
    <hr class="my-4 -mx-4 border-green-theme" />
    <div class="flex flex-col gap-3">
      <span class="font-semibold text-xs">Experience Level</span>
      <div class="flex flex-col gap-1">
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Any</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Entry</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Mid</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Expert</label>
        </div>
      </div>
    </div>
    <hr class="my-4 -mx-4 border-green-theme" />
    <div class="flex flex-col gap-3">
      <span class="font-semibold text-xs">Work Type</span>
      <div class="flex flex-col gap-1">
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Part-Time</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Full-Time</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Internship</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Freelance</label>
        </div>
      </div>
    </div>
    <hr class="my-4 -mx-4 border-green-theme" />
    <div class="flex flex-col gap-3">
      <span class="font-semibold text-xs">Work Type</span>
      <div class="flex flex-col gap-1">
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Remote</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">On-site</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" />
          <label for="any" class="ml-2 text-xs font-medium">Hybrid</label>
        </div>
      </div>
    </div>
    <hr class="my-4 -mx-4 border-green-theme" />
    <div class="flex flex-col gap-3">
      <span class="font-semibold text-xs">Tags</span>
      <div class="flex flex-wrap gap-2">
        <TagComponent text="Software development" />
        <TagComponent text="PHP" />
        <TagComponent text="Python" />
        <TagComponent text="Javascript" />
        <TagComponent text="Backend" />
        <TagComponent text="Frontend" />
        <TagComponent text="Full stack" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SalaryRange from './SalaryRange.vue'
import TagComponent from '../shared/TagComponent.vue'
</script>
