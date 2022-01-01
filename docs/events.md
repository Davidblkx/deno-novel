### Events

Events are used to notify the application of state changes and to trigger actions.

### Triggering events

```ts
import { DnEvents } from 'https://deno.land/x/deno-novel/mod.ts;

try {
  // Do something that may throw an exception
} catch (e: Error) {
  DnEvents.emit('exception', e);
}
```
### Listening for events

```ts
import { DnEvents } from 'https://deno.land/x/deno-novel/mod.ts;

DnEvents.on('exception', (e: Error) => {
  // Do something with the unhandled exception
});
```

### Stop listening for events

```ts
import { DnEvents } from 'https://deno.land/x/deno-novel/mod.ts;

const sub = DnEvents.on('exception', (e: Error) => {
  // Do something with the unhandled exception
});

DnEvents.on('initEnd', () => {
  sub.unsubscribe();
});
```

### Custom events and typings

Events are fully typed, and by default only support internal events.
There are two ways to emit/subscribe to custom events:

*1) Export a new Handler with custom types*

```ts
// my-events.ts
import { DnEvents } from 'https://deno.land/x/deno-novel/mod.ts;

export interface AppEventsMap {
  changeState: 'on' | 'off';
  showAlert: {
    message: string;
    type: 'success' | 'error';
  },
  hideMenus: never;
}

export const AppEvents = DnEvents.add<AppEventsMap>();
```

```ts
// my-app.ts
import { AppEvents } from './my-events.ts';

AppEvents.emit('changeState', 'off');
AppEvents.emit('showAlert', {
  message: 'Hey!',
  type: 'success',
});
AppEvents.emit('hideMenus');
AppEvents.emit('exception', new Error('Oops!')); // you can keep using all other events
```

*2) Define the type before usage*

```ts
import { DnEvents } from 'https://deno.land/x/deno-novel/mod.ts;

export interface EvMap {
  wait: number;
  close: never;
}

DnEvents.for<EvMap>().emit('wait', 5000);

// its also possible to store the handler
const handler = DnEvents.for<EvMap>();
handler.emit('close');
```

### Typing  with *for* vs *add*

 - *add* will merge a type with current one
 - *for* will replace the type

So if defined with `DnEvents.for<EvMap>()` you cannot emit events not in `EvMap` type
