import { DnAttrDefinition } from './models.ts';

/** Create a attribute map for string */
export function stringAttr(
  name: string,
  defaultValue?: string,
  triggerRender?: boolean,
  description?: string,
): DnAttrDefinition<string> {
  return {
    name,
    type: 'string',
    default: defaultValue ?? '',
    toString: (e) => e,
    fromString: (s) => s,
    triggerRender: triggerRender ?? true,
    description,
  };
}

/** Create a attribute map for number */
export function numberAttr(
  name: string,
  defaultValue?: number,
  triggerRender?: boolean,
  description?: string,
): DnAttrDefinition<number> {
  return {
    name,
    type: 'number',
    default: defaultValue ?? 0,
    toString: (e) => e.toString(),
    fromString: (s) => Number(s),
    triggerRender: triggerRender ?? true,
    description,
  };
}

/** Create a attribute map for boolean */
export function booleanAttr(
  name: string,
  defaultValue?: boolean,
  triggerRender?: boolean,
  description?: string,
): DnAttrDefinition<boolean> {
  return {
    name,
    type: 'boolean',
    default: defaultValue ?? false,
    toString: (e) => e.toString(),
    fromString: (s) => s === 'true',
    triggerRender: triggerRender ?? true,
    description,
  };
}

/** Create a attribute map for an array */
export function arrayAttr<T>(
  name: string,
  toString?: (e: T[]) => string,
  fromString?: (s: string) => T[],
  defaultValue?: T[],
  triggerRender?: boolean,
  description?: string,
): DnAttrDefinition<T[]> {
  return {
    name,
    type: 'array',
    default: defaultValue ?? [],
    toString: toString ?? ((e) => JSON.stringify(e)),
    fromString: fromString ?? ((s) => JSON.parse(s) as T[]),
    triggerRender: triggerRender ?? true,
    description,
  };
}

/** Create an attribute map for object */
export function objectAttr<T>(
  name: string,
  toString?: (e: T) => string,
  fromString?: (s: string) => T,
  defaultValue?: T,
  triggerRender?: boolean,
  description?: string,
): DnAttrDefinition<T> {
  return {
    name,
    type: 'object',
    default: defaultValue ?? ({} as T),
    toString: toString ?? ((e) => JSON.stringify(e)),
    fromString: fromString ?? ((s) => JSON.parse(s)),
    triggerRender: triggerRender ?? true,
    description,
  };
}
