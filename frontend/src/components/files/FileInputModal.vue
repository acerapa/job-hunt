<template>
  <ModalComponent v-model="showModal" :title="props.title"></ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from '../shared/ModalComponent.vue'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Upload Files'
})

const showModal = defineModel<boolean>()
</script>
