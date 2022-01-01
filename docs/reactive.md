### Reactivity

Deno Novel is built with reactivity in mind and at its core uses a collection of objects directly inspired by `RxJS`, that provides a simple way to create custom observables and operators.

At is core of Deno Novel, the `Observable` type is the base for all reactive programming, and has three main implementations:

## Subject

Subject is the most basic implementation of an `Observable`, and is the most common way to create an `Observable`. Allows to subscribe to the `Observable` and to push values to it.

```ts
import { Subject } from 'https://deno.land/x/deno-novel/mod.ts;

const subject = new Subject<number>();

const sub = subject.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('complete'),
});

subject.next(1); // 1
subject.next(2); // 2

sub.unsubscribe();

subject.next(3); // nothing happens
```

## Value Subject

Value Subject is a special kind of Subject that allways emits the last value that was pushed to it.

```ts
import { ValueSubject } from 'https://deno.land/x/deno-novel/mod.ts;

const subject = new ValueSubject<number>(1);

subject.subscribe({next: (value) => console.log(value)}); // 1 is printed

subject.next(2); // 2 is printed

subject.subscribe({next: (value) => console.log(value)}); // 2 is printed
```

## Replay Subject

Replay Subject is a special kind of Subject that emits the last n values that were pushed to it.

```ts
import { ReplaySubject } from 'https://deno.land/x/deno-novel/mod.ts;

const subject = new ReplaySubject<number>(1, 2, 3);

subject.subscribe({next: (value) => console.log(value)}); // 1, 2, 3 are printed

subject.next(4); // 4 is printed

subject.subscribe({next: (value) => console.log(value)}); // 1, 2, 3, 4 are printed
```
