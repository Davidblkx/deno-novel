import type { ISubscription } from "./models.ts";
import { Observable } from './observable.ts';

/** Push last value from observer to subscribers */
export class Subject<T> extends Observable<T> {
  private _value: T;

  /** last value */
  public get value(): T { return this._value; }

  public constructor(value: T) {
    super();
    this._value = value;
  }

  public override subscribe(
    onValue?: (value: T) => void,
    onError?: (error: Error) => void,
    onComplete?: () => void,
  ): ISubscription {
    const sub = super.subscribe(onValue, onError, onComplete);

    // Emit last value
    if (!this.completed && onValue) { onValue(this._value); }

    return sub;
  }
}
