/** Allow to cancel a subscription */
export interface ISubscription {
  /** Close subscription */
  cancel(): void;
  /** Get subscription status */
  get open(): boolean;
}

/** Object that emit values */
export interface IObservable<T> {
  /** Subscribe to the observable */
  subscribe(
    onValue?: (value: T) => void,
    onError?: (error: Error) => void,
    onComplete?: () => void,
  ): ISubscription;

  /** Convert to promise */
  asPromise(): Promise<T>

  /** Apply function */
  pipe<U>(pipeable: IPipeable<T, U>): IObservable<U>;
}

/** Object that generates values */
export interface IObserver<T> {
  /** Notify observer */
  next(value: T): void;
  /** Notify observer */
  error(error: Error): void;
  /** Notify observer */
  complete(): void;
}

export type IPipeable<T, U> = (input: IObservable<T>) => IObservable<U>;
