<template>
  <div class="flex gap-4">
    <div class="max-w-[550px] w-full h-[calc(100vh_-_134px)] flex flex-col gap-4">
      <div class="wrap text-white !bg-green-bright">
        <p class="text-2xl font-semibold">Create Job Posting</p>
      </div>
      <div class="wrap flex flex-col gap-3">
        <div class="flex gap-3 justify-center items-center font-bold">
          <button class="step-item active-item">1</button>
          <button class="step-item">2</button>
        </div>

        <InputComponent
          type="text"
          name="title"
          label="Job Title"
          label-css="font-medium"
          placeholder="Enter job title"
        />
        <div class="flex flex-col gap-0">
          <p class="font-medium">Available work setup</p>
          <div class="flex gap-4">
            <CheckButtonComponent label="On-site" id="on-site" name="on-site" value="on-site" />
            <CheckButtonComponent label="Remote" id="remote" name="remote" value="remote" />
            <CheckButtonComponent label="Hybrid" id="hybrid" name="hybrid" value="hybrid" />
          </div>
          <div class="px-3 mt-3">Test</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/shared/InputComponent.vue'
import CheckButtonComponent from '@/components/shared/CheckButtonComponent.vue'
</script>

<style scoped>
.step-item {
  @apply text-main border border-main w-8 h-8 rounded-full;
}

.active-item {
  @apply !text-white !bg-main;
}
</style>
