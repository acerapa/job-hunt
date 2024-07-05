<template>
  <header class="h-[60px] w-full bg-sub flex justify-center">
    <div class="max-w-7xl h-full w-full text-main flex items-center justify-between px-4">
      <div class="flex gap-10 items-center">
        <p class="text-xl font-bold cursor-pointer">Job Hunt</p>
        <div class="flex gap-5">
          <RouterLink class="text-sm font-normal">Find Job</RouterLink>
          <RouterLink class="text-sm font-normal">Post Job</RouterLink>
          <RouterLink class="text-sm font-normal">About Us</RouterLink>
          <RouterLink class="text-sm font-normal">Contact Us</RouterLink>
        </div>
      </div>
      <div class="flex gap-3 items-center">
        <RouterLink class="text-sm font-normal">Sign in</RouterLink>
        <div class="border w-0 h-8 border-main rounded"></div>
        <button class="btn-outline">Sign up</button>
      </div>
    </div>
  </header>
</template>

<script setup></script>
