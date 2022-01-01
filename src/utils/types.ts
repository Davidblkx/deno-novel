
/** Clone of object */
export type ObjectOf<T> = { [key in keyof T]: T[key] };

/** Generic constructor type */
// deno-lint-ignore no-explicit-any
export type Type<T> = new (...args: any[]) => T;

/** Key names for object */
export type Keys<T> = Extract<keyof T, string>;
