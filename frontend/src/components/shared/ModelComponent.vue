<template>
  <div
    class="fixed w-screen h-screen z-[60] top-0 left-0 backdrop-blur-sm flex items-center justify-center"
  >
    <div class="wrap shadow-lg flex flex-col gap-4">
      <div class="flex justify-between">
        <p class="text-base font-semibold">{{ props.title }}</p>
        <button class="text-2xl leading-6 text-red-500" @click="show = false">&times;</button>
      </div>
      <form @submit.prevent>
        <slot></slot>

        <div class="flex items-center gap-3 mt-4">
          <button class="btn-outline" type="button" @click="show = false">Cancel</button>
          <button class="btn" type="submit" @click="emit('save')">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const emit = defineEmits(['save'])

const props = defineProps<Props>()

const show = defineModel()
</script>
