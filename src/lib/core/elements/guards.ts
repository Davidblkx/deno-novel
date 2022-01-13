import { isObject } from '../../../utils/guards.ts';
import { ElemDefinition } from './models.ts';

import type { DnElement } from "./dn-element.ts";

export function isElemDefinition<T extends DnElement<T>>(input: unknown): input is ElemDefinition<T> {
  const p = input as ElemDefinition<T>;
  return isObject(p)
    && typeof p.tagName === 'string'
    && typeof p.constructor === 'function'
    && Array.isArray(p.attr);
}
