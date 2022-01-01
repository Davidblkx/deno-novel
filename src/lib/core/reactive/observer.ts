import type { IObserver } from "./models.ts";

/** React to values from observable */
export class Observer<T> implements IObserver<T> {

    private readonly _observer: Partial<IObserver<T>>;

    constructor(
      onValue?: (value: T) => void,
      onError?: (error: Error) => void,
      onComplete?: () => void,
    ) {
      this._observer = {
        next: onValue,
        error: onError,
        complete: onComplete,
      };
    }

    next(value: T): void {
      setTimeout(() => {
        if (this._observer.next) {
          this._observer.next(value);
        }
      }, 0);
    }
    error(error: Error): void {
      setTimeout(() => {
        if (this._observer.error) {
          this._observer.error(error);
        }
      }, 0);
    }
    complete(): void {
      setTimeout(() => {
        if (this._observer.complete) {
          this._observer.complete();
        }
      }, 0);
    }
}
