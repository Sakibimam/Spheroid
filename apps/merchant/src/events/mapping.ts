type Data<T = Record<string, unknown> | undefined, E = Error | undefined> = {
  code: string
  message: string
  data?: T
  error?: E
}

export type EventMap = {}

export type EventName = keyof EventMap
export type EventData<T extends EventName> = EventMap[T]
