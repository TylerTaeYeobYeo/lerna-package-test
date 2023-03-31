export type SubscribeFn<T> = (data: T) => void
export type UnsubscribeFn = () => void

export default class Subject<T> {
  private _subscribers: SubscribeFn<T>[] = []
  constructor() {}

  publish(data: T) {
    this._subscribers.forEach(subscriber => subscriber(data))
  }

  subscribe(fn: SubscribeFn<T>): UnsubscribeFn {
    this._subscribers.push(fn)
    return () => {
      this._subscribers = this._subscribers.filter(
        subscriber => subscriber !== fn,
      )
    }
  }
}
