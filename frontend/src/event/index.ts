interface EventQueque {
  event: string
  callback: Function | Function[]
}

export class Event {
  static events: EventQueque[] = []

  static on(event: string, callback: Function | Function[], append: boolean = false) {
    const evt = this.events.find((v) => v.event == event)
    if (evt) {
      if (append) {
        const callbacks = []
        if (Array.isArray(evt.callback)) {
          callbacks.push(...evt.callback)
        } else {
          callbacks.push(evt.callback)
        }
        callbacks.push(callback)

        evt.callback = callbacks as Function | Function[]
      } else {
        evt.callback = callback
      }
    } else {
      this.events.push({
        event,
        callback
      })
    }
  }

  static emit(event: string, data: any = null) {
    const evt = this.events.find((v) => v.event == event)
    if (evt) {
      if (Array.isArray(evt.callback)) {
        evt.callback.map((fn) => (fn.length ? fn(data) : fn()))
      } else {
        return evt.callback.length ? evt.callback(data) : evt.callback()
      }
    }
  }
}
