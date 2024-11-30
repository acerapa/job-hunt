<template>
  <ModelComponent
    :title="props.title"
    v-model="showModal"
    close-btn-text="No"
    save-btn-text="Yes"
    @save="emit('confirm')"
  >
    <p class="text-lg">{{ props.confirmationText }}</p>
  </ModelComponent>
</template>

<script setup lang="ts">
import ModelComponent from './ModelComponent.vue'

const emit = defineEmits(['confirm'])

interface Props {
  title?: string
  confirmationText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirmation',
  confirmationText: 'Do you want to delete this item?'
})

const showModal = defineModel()
</script>
