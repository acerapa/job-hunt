<template>
  <ModalComponent
    title="Files"
    v-model="showModal"
    @save="onSave"
    @cancel="onCancel"
    :save-btn-text="'Done'"
  >
    <div
      @drop.prevent="onDropFiles"
      @dragleave.prevent="dragAreaClass = ''"
      @dragover.prevent="dragAreaClass = 'border-blue-500'"
      class="w-96 max-w-96 h-52 max-h-52 flex border-2 p-2 overflow-auto"
      :class="[files.length ? '' : 'border-dashed items-center justify-center', dragAreaClass]"
    >
      <div class="text-center" v-if="!files.length">
        <p class="text-gray-500">Drag your files here</p>
        <p class="text-gray-500">or</p>
        <div>
          <label class="btn-outline cursor-pointer" for="msg-files">Choose files</label>
          <input
            id="msg-files"
            type="file"
            class="invisible"
            multiple
            @input="onChange"
            accept=".jpg,.jpeg,.png,.gif"
          />
        </div>
      </div>

      <div class="flex flex-col gap-3 w-full" v-if="files.length">
        <div
          class="flex gap-3 w-full relative border rounded p-2"
          v-for="(prev, ndx) in filePreviews"
          :key="prev.url"
        >
          <button
            @click="removeFile(ndx)"
            class="w-fit h-fit px-2 -top-2 -right-2 z-10 absolute rounded-full text-white bg-red-500 flex items-center justify-between text-center"
          >
            <span> &times; </span>
          </button>
          <img
            :src="prev.url"
            :alt="prev.name"
            :title="prev.name"
            class="w-8 h-8 object-cover rounded brightness-50"
          />
          <p class="flex-1 overflow-hidden text-ellipsis">{{ prev.name }}</p>
        </div>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ModalComponent from '../shared/ModalComponent.vue'

const showModal = defineModel<boolean>()
const cleanedFiles = defineModel<Partial<File>[]>('files')

const files = ref<File[]>([])
const dragAreaClass = ref('')
const filePreviews = ref<{ url: string; name: string }[]>([])

const onDropFiles = (e: DragEvent) => {
  dragAreaClass.value = ''
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
  showModal.value = false
}

const onCancel = () => {
  // reset everything
  files.value = []
  cleanedFiles.value = []
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

onMounted(() => {
  if (cleanedFiles.value && cleanedFiles.value.length) {
    files.value = cleanedFiles.value as File[]
  }
})

watch(
  () => files.value,
  (val) => {
    if (val.length) {
      filePreviews.value = val.map((file) => {
        return {
          name: file.name,
          url: URL.createObjectURL(file)
        }
      })
    }
  },
  { deep: true }
)
</script>
