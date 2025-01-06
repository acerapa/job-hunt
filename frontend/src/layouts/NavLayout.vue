<template>
  <main>
    <HeaderComponent class="fixed top-0 z-50" />
    <div class="px-8 max-md:px-3 lg:max-w-7xl w-full mx-auto max-[600px]:mt-[80px] mt-[102px]">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/shared/HeaderComponent.vue'
</script>
