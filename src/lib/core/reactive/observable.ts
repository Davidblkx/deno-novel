import type { IObservable, ISubscription, IObserver, IPipeable } from "./models.ts";
import { Observer } from './observer.ts';
import { Subscription } from './subscription.ts';

/** Push new values from observer to subscribers */
export class Observable<T> implements IObservable<T>, IObserver<T> {
  private readonly _subscribers: Map<Subscription, Observer<T>> = new Map();
  private _isComplete = false;

  public get open(): boolean { return this._subscribers.size > 0; }

  public get completed(): boolean { return this._isComplete; }

  public subscribe(
    onValue?: (value: T) => void,
    onError?: (error: Error) => void,
    onComplete?: () => void,
  ): ISubscription {
    const observer = new Observer(onValue, onError, onComplete);
    const subscription: Subscription = new Subscription(() => this._subscribers.delete(subscription));
    this._subscribers.set(subscription, observer);

    if (this._isComplete) {
      observer.complete();
    }

    return subscription;
  }

  public next(value: T): void {
    if (this._isComplete) { return; }
    this._subscribers.forEach((observer) => observer.next(value));
  }

  public error(error: Error): void {
    this._subscribers.forEach((observer) => observer.error(error));
  }

  public complete(): void {
    if (this._isComplete) { return; }
    this._isComplete = true;
    this._subscribers.forEach((observer) => observer.complete());
    for (const sub of [...this._subscribers.keys()]) { sub.unsubscribe(); }
  }

  public nextAndComplete(value: T): void {
    this.next(value);
    this.complete();
  }

  public asPromise(): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.subscribe(resolve, reject);
    });
  }

  public pipe<U>(pipeable: IPipeable<T, U>): IObservable<U> {
    return pipeable(this);
  }
}
