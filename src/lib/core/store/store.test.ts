import {
  assertEquals,
  assertThrows,
} from '../../../_deps.ts';
import { createAction } from './action.ts';
import {
  createReducer,
  on,
} from './reducer.ts';
import { Store } from './store.ts';

type UserState = {
  name: string;
  age: number;
}

type CarSate = {
  brand: string;
  model: string;
}

type AddressState = {
  street: string;
  city: string;
}

type AppState = {
  user: UserState;
  car: CarSate;
}

const setUserName = createAction<string>('setUserName');
const setUserAge = createAction<number>('setUserAge');
const setCarBrand = createAction<string>('setCarBrand');
const setCarModel = createAction<string>('setCarModel');

const createUserReducer = () => createReducer<UserState>({
    name: 'John Doe',
    age: 50,
  },
  on(setUserName, (s, a) => ({ ...s, name: a.payload })),
  on(setUserAge, (s, a) => ({ ...s, age: a.payload })),
);

const createCarReducer = () => createReducer<CarSate>({
    brand: 'Ford',
    model: 'Fiesta',
  },
  on(setCarBrand, (s, a) => ({ ...s, brand: a.payload })),
  on(setCarModel, (s, a) => ({ ...s, model: a.payload })),
);

const createAddressReducer = () => createReducer<AddressState>({
    street: '123 Main St',
    city: 'Anytown',
  });

const getAppStore = () => new Store<AppState>({
  user: createUserReducer(),
  car: createCarReducer(),
});

Deno.test('[Store] Should access store state', () => {
  const appStore = getAppStore();

  let userState: UserState | undefined;
  let carState: CarSate | undefined;

  appStore.select('user').subscribe({
    next: (user) => userState = user,
  });

  appStore.subscribe('car', c => carState = c);

  assertEquals(userState?.age, 50);
  assertEquals(userState?.name, 'John Doe');
  assertEquals(carState?.brand, 'Ford');
  assertEquals(carState?.model, 'Fiesta');
});

Deno.test('[Store] Should throw on state changes', () => {
  const appStore = getAppStore();

  const userState = appStore.select('user').value;

  assertThrows(() => userState.name = 'John');
});

Deno.test('[Store] Should merge new reducers', () => {
  const appStore = getAppStore().merge<{ address: AddressState }>({
    address: createAddressReducer(),
  });

  const addressState = appStore.select('address').value;
  const userState = appStore.select('user').value;

  assertEquals(addressState.city, 'Anytown');
  assertEquals(addressState.street, '123 Main St');
  assertEquals(userState.age, 50);
  assertEquals(userState.name, 'John Doe');
});

Deno.test('[Store] Should dispatch actions', async () => {

  const appStore = getAppStore();

  let userState = appStore.select('user').value;
  appStore.select('user', c => userState = c);

  assertEquals(userState.age, 50);
  assertEquals(userState.name, 'John Doe');

  await appStore.dispatch(setUserAge(60));

  assertEquals(userState.age, 60);
  assertEquals(userState.name, 'John Doe');

});
