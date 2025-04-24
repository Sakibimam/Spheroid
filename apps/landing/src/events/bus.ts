import { EventMap, EventName } from "./mapping"

type CustomEvent<T> = {
  readonly detail?: T
} & Event

class EventBus {
  private callbacks: Map<string, Map<ICallback<EventMap[keyof EventMap]>, EventListener>> = new Map()

  on<K extends EventName>(event: K, callback: ICallback<EventMap[K]>) {
    const eventListener: EventListener = (e: CustomEvent<EventMap[K]>) => callback(null, e.detail)

    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, new Map())
    }
    this.callbacks.get(event)?.set(callback, eventListener)

    document.addEventListener(event, eventListener)
  }

  off<K extends EventName>(event: K, callback: ICallback<EventMap[K]>) {
    const eventListeners = this.callbacks.get(event)
    const eventListener = eventListeners?.get(callback)

    if (eventListener) {
      document.removeEventListener(event, eventListener)
      eventListeners?.delete(callback)
    }

    if (eventListeners && eventListeners.size === 0) {
      this.callbacks.delete(event)
    }
  }

  dispatch<K extends EventName>(event: K, data: EventMap[K]) {
    document.dispatchEvent(new CustomEvent<EventMap[K]>(event, { detail: data }))
  }
}

const eventBus = new EventBus()

export default eventBus
