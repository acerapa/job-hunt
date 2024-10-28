<template>
  <div class="flex justify-between px-3 text-sm items-center">
    <p class="font-bold text-main">Page 1 of 3</p>
    <div class="flex gap-3 font-bold text-main">
      <button class="active-page paginate">1</button>
      <button class="paginate">2</button>
      <button class="paginate">3</button>
    </div>
    <div class="flex gap-3">
      <button class="btn font-bold !bg-gray-strong hover:!bg-white hover:border-gray-strong">
        Previous
      </button>
      <button class="btn font-bold !bg-gray-strong hover:!bg-white hover:border-gray-strong">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.paginate {
  padding: 2px 8px;
  border-radius: 4px;
}

.active-page {
  @apply border !border-green-bright;
}
</style>
