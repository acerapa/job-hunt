<template>
  <div>
    <HeaderComponent />
    <div class="max-w-7xl mx-auto px-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/shared/HeaderComponent.vue'
</script>
