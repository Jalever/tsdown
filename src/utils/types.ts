export type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U
export type MaybePromise<T> = T | Promise<T>
export type MarkPartial<T, K extends keyof T> = Omit<Required<T>, K> &
  Partial<Pick<T, K>>

export type WatchCallback = (first?: boolean) => void | Promise<void>
export type CleanupCallback = () => void | Promise<void>
