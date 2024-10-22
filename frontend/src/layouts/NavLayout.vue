<template>
  <main>
    <HeaderComponent class="fixed top-0 z-50" />
    <div class="px-8 max-w-7xl w-full mx-auto mt-[102px]">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/shared/HeaderComponent.vue'
</script>
