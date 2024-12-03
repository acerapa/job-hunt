<template>
  <div class="flex flex-col gap-4">
    <div class="wrap flex justify-between">
      <p class="text-lg font-semibold">Company Details</p>
      <button class="btn-outline" @click="router.back()">&longleftarrow; Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
