### State Management

In this section we will look at how to manage state in a reactive way. For that Deno Novel uses a built-in library inspired by the likes of [NgRx]() or [Vuex](), resumed into four main concepts:

  - State is a plain object that contains all the data of the application.
  - State can only be modified by actions.
  - State can be observed for changes.
  - State can be split into multiple parts.

!> Some undertstanding of how Deno Novel handles [reactivity](reactive.md) is required.

## Quick Start

> 1) Start by creating the individual state parts. For example, if you want to manage the user's profile, you can create a `profile` state part.

```ts
/** profile.ts */
import { createAction, createReducer, on } from 'https://deno.land/x/deno-novel/mod.ts';

// Define the state part
export type ProfileState = {
  name: string;
  points: number;
};

const initialState = {
  name: '',
  points: 0,
};

// Action to change the user's name
const changeName = createAction<string>(Symbol('changeName'));
// Action to add 1 point to the user's points
const addPoint = createAction(Symbol('addPoint'));

// export the state reducer
export const profileReducer = createReducer<ProfileState>({
  initialState,
  on(changeName, (s, a) => ({ ...s, name: a.payload })),
  on(addPoint, s => ({ ...s, points: s.points + 1 })),
);
```
> 2) Initialize the store to handle state changes.

```ts
/** store.ts */
import { Store } from 'https://deno.land/x/deno-novel/mod.ts';
import { ProfileState, profileReducer } from './profile.ts';

// The global state for our application
export type AppState = {
  profile: ProfileState;
  // other state parts
};

// Create the store and make it global so it can be shared between components
export const appStore = Store.initGlobal<AppState>({
  profile: profileReducer,
  // other state reducers
});
```

> 3) Use the store in your components.

```ts
import { appStore } from './store.ts';

// Select a part of the state
const points$ = appStore.select('profile', s => s.points);
points$.subscribe(console.log); // prints 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...

function onUserWin() {
  // Dispatch an action to add 1 point to the user's points
  appStore.dispatch(addPoint());
}
```

## Actions

Actions are the main way to modify the state. There are two types of actions, with and without payload.

> Create an simple action:
```ts
const action = createAction('action');
```
> Create an action with a payload:
```ts
type Payload = {
  name: string;
  date: Date;
};
const actionWithPayload = createAction<Payload>('actionWithPayload');
```

When dispatching an action, the store will pass it to all reducers, so the type should be unique to each reducer.

> Dispatch an action:
```ts
appStore.dispatch(action());
appStore.dispatch(actionWithPayload({ name: 'Deno', date: new Date() }));
```

!> You can use [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) to create unique action types.


## Reducers

Reducers are functions that take the current state and an action and return the new state. The easiest way to create a reducer is to use the `createReducer` function. It takes a initial state and a list of action reducers. Action reducers are created by using the `on` function.

> create a state reducer:

```ts
// Type of the state
export type MyState = { name: string };
// Initial state
const initialState = { name: 'Deno' };
// Action to change the user's name
const setName = createAction<string>(Symbol('setName'));
// Creating the state reducer
export myReducer = createReducer<MyState>(
  initialState,
  on(setName, (s, a) => ({ ...s, name: a.payload })), // awlays return a new state or wont trigger a change
  // ... more reducers
);
```

### Handle non-primitive types

In order to be easly exported, state type can only be composed by primitive types or objects and arrays of primitive types. So if you want to handle non-primitive types, you need to create a custom reducers and selector.

```ts
/** my-state.ts */

// Type of the state
export type MyState = { date: string };
// Initial state
const initialState = { date: new Date().toISOString() };
// Action to change the date
const setDate = createAction<Date>(Symbol('setDate'));
// Creating the state reducer
export myReducer = createReducer<MyState>(
  initialState,
  on(setDate, (s, a) => ({ ...s, date: a.payload.toISOString() })),
  // ... more reducers
);
export const selectDate = (s: MyState) => new Date(s.date);
```

```ts
/** my-component */
import { selectDate } from './my-state.ts';
import { appStore } from './store.ts';

const date$ = appStore.select('myState', selectDate); // IObservable<Date>
```


## Store

Store is the state manager, my design multiple stores can be created, but by principle only one store should be created. This is achived by using the `initGlobal`  static function. Its possible to invoke the initGlobal function multiple times, and redurcers will be added to the global store.

*Look at this example, 2 different stores are created using the `initGlobal`*

```ts
/** app-store.ts */
export type AppState = {
  profile: ProfileState;
  items: ItemState;
};

export const appStore = Store.initGlobal<AppState>({
  profile: profileReducer,
  items: itemReducer,
});
```

```ts
/** module-store.ts */
export type ModuleState = {
  mod1: Mod1State;
  mod2: Mod2State;
};

export const modStore = Store.initGlobal<ModuleState>({
  mod1: mod1Reducer,
  mod2: mod2Reducer,
});
```
*1) We can then use this stores individually*

```ts
/** app-component.ts*/
import { appStore } from './app-store.ts';
import { modStore } from './module-store.ts';

const profile$ = appStore.select('profile');
const mod1$ = modStore.select('mod1');
```

*2) Or we can use the global store*

```ts
/** app-component.ts*/
import { Store } from 'https://deno.land/x/deno-novel/mod.ts';
import { AppState } from './app-store.ts';
import { ModuleState } from './module-store.ts';

const store = Store.global<AppState & ModuleState>();

const profile$ = store.select('profile');
const mod1$ = store.select('mod1');
```

This is the recommended way to have external plugins and modules to interact with the store.
