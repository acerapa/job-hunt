<template>
  <ModalComponent title="Files" v-model="showModal" @save="onSave" @cancel="onCancel">
    <div
      @drop.prevent="onDropFiles"
      @dragover.prevent
      class="w-96 max-w-96 h-52 max-h-52 border-2 border-dashed flex items-center justify-center"
    >
      <div class="text-center">
        <p class="text-gray-500">Drag your files here</p>
        <p class="text-gray-500">or</p>
        <div>
          <label class="btn-outline cursor-pointer" for="msg-files">Choose files</label>
          <input id="msg-files" type="file" class="invisible" multiple @input="onChange" />
        </div>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalComponent from '../shared/ModalComponent.vue'
import { type File as IFile } from '@shared/pack'

const showModal = defineModel<boolean>()
const files = ref<File[]>([])
const cleanedFiles = defineModel<Partial<IFile>[]>('files')

const onDropFiles = (e: DragEvent) => {
  if (!files.value) {
    files.value = []
  }
  files.value.push(...Array.from(e.dataTransfer?.files || []))
}

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!files.value) {
    files.value = []
  }
  files.value.push(...Array.from(target.files || []))
}

const onSave = () => {
  // clean the files and structure it the way the backend expects it
  cleanedFiles.value = files.value
}

const onCancel = () => {
  // reset everything
  files.value = []
  cleanedFiles.value = []
}
</script>
