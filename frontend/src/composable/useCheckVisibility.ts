import { ref } from 'vue'

export const useCheckVisibility = () => {
  const observer = ref<IntersectionObserver>()

  const startObserver = (root: HTMLElement, child: HTMLElement, callback: Function) => {
    if (observer.value) {
      observer.value.disconnect()
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callback(entry.isIntersecting)
        })
      },
      {
        root,
        threshold: 0.5
      }
    )

    observer.value.observe(child)
  }

  return {
    observer,

    startObserver
  }
}
