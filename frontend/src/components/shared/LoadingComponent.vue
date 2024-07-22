<template>
  <div
    class="absolute bg-opacity-60 top-0 left-0 w-full h-full bg-white flex items-center justify-center"
  >
    <div class="loader">
      <img src="@/assets/images/battle.png" alt="battle" class="w-16 h-16" />
      <p class="text-center text-main font-bold">Loading ...</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  0% {
    opacity: 1;
  }
}

.loader {
  animation: fade-in 3s infinite;
}
</style>
