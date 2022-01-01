import type { IObservable, IPipeable } from "./models.ts";
import { Observable } from './observable.ts';

/** Wait specified amount of miliseconds before emiting a value */
export function debounce<T>(wait: number): IPipeable<T, T> {
  return (observable: IObservable<T>): IObservable<T> => {
    const obs = new Observable<T>();

    let timeout: number | undefined;

    observable.subscribe(
      (value) => {
        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          obs.next(value);
        }, wait);
      },
      (error) => {
        obs.error(error);
      },
      () => {
        if (timeout) {
          clearTimeout(timeout);
        }

        obs.complete();
      }
    );

    return obs;
  };
}

/** Map values from observable */
export function map<T, U>(mapper: (value: T) => U): IPipeable<T, U> {
  return (observable: IObservable<T>): IObservable<U> => {
    const obs = new Observable<U>();

    observable.subscribe(
      (value) => {
        obs.next(mapper(value));
      },
      (error) => {
        obs.error(error);
      },
      () => {
        obs.complete();
      }
    );

    return obs;
  };
}
