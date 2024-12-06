<template>
  <div ref="editor"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import Quill, { Delta } from 'quill'
import 'quill/dist/quill.snow.css'

const emit = defineEmits(['input'])

const val = defineModel()

interface Props {
  readonly?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
  placeholder: 'Write your content here...'
})

// flags is typing
const typing = ref(false)

const editor = ref()
const quill = ref<Quill>()
onMounted(() => {
  if (editor.value) {
    quill.value = new Quill(editor.value, {
      theme: 'snow',
      readOnly: false,
      placeholder: props.placeholder,
      modules: {
        // toolbar: [
        //   [{ size: ['small', false, 'large', 'huge'] }],
        //   [{ font: [] }],
        //   ['bold', 'italic', 'underline', 'strike'],
        //   ['blockquote', 'code-block'],
        //   [{ header: 1 }, { header: 2 }],
        //   [{ list: 'ordered' }, { list: 'bullet' }],
        //   [{ indent: '-1' }, { indent: '+1' }],
        //   [{ align: [] }],
        //   ['clean']
        // ]
      }
    })

    quill.value.setContents(new Delta())

    // set text-change event
    quill.value.on('text-change', () => {
      if (quill.value) {
        emit('input', quill.value.getContents())
        val.value = quill.value.getContents()
      }
      typing.value = true
    })
  }
})

watch(
  () => val.value,
  () => {
    if (quill.value && val.value && typeof val.value === 'object' && !typing.value) {
      // some codes here
    }
  }
)
</script>

<style>
.ql-toolbar {
  @apply rounded-t;
}

.ql-container {
  @apply rounded-b;
}

.ql-editor ul li::before {
  display: none;
}
</style>
