import { Observable } from './observable.ts';

/** Convert promise to observable */
export function fromPromise<T>(promise: Promise<T>): Observable<T> {
  const obs = new Observable<T>();

  promise.then(
    (value) => {
      obs.next(value);
      obs.complete();
    }
  ).catch(
    (error) => {
      obs.error(error);
    }
  );

  return obs;
}

/** Convert interable to observable */
export function fromIterable<T>(iterable: Iterable<T>): Observable<T> {
  const obs = new Observable<T>();

  setTimeout(() => {
    for (const value of iterable) {
      obs.next(value);
    }
  }, 0);

  return obs;
}

/** Convert observable to promise */
export function toPromise<T>(observable: Observable<T>): Promise<T> {
  return new Promise<T>(
    (resolve, reject) => {
      observable.subscribe(
        (value) => {
          resolve(value);
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
}
