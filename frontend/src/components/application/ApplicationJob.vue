<template>
  <div class="wrap flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <div class="flex gap-3 items-center">
        <img src="@/assets/images/default.png" alt="default.png" class="w-12 h-12" />
        <div class="flex gap-3 items-center">
          <div class="flex flex-col gap-0">
            <p class="text-base font-semibold leading-tight">PHP Developer</p>
            <p class="text-xs font-bold text-gray-strong">ABC Company</p>
          </div>
          <span
            class="pending text-xs rounded px-2 pb-0.5 font-bold !border-2"
            v-if="props.hasStatus"
          >
            pending
          </span>
        </div>
      </div>
      <p class="text-sm font-semibold text-pale-gray">Applied 10 days ago</p>
    </div>
    <div>
      <p class="font-bold text-xs">Full-Time - Entry Level</p>
      <div class="flex gap-3 items-start">
        <p class="line-clamp-3 text-pastel-gray text-sm">
          Lorem ipsum dolor sit amet consectetur. Ut enim lacus felis nullam. Diam vel elit
          consectetur egestas tincidunt bibendum nulla. Risus praesent eget convallis dui non.
          Habitasse euismod pellentesque dui sed a lectus aliquam.
        </p>
        <button class="btn" v-if="props.hasStatus">Details</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hasStatus: boolean
}
const props = withDefaults(defineProps<Props>(), {
  hasStatus: true
})
</script>
