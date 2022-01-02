// deno-lint-ignore-file no-explicit-any

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(deepClone) as unknown as T;
  }

  const clone = Object.create(Object.getPrototypeOf(obj));

  Object.keys(obj).forEach(key => {
    clone[key] = deepClone((obj as any)[key]);
  });

  return clone as unknown as T;
}

export function deepFreeze<T>(obj: T): T {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = obj[name as keyof T];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
}
