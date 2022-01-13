import {
  IObservable,
  IValueObservable,
  Subject,
  ValueSubject,
} from '../reactive/__.ts';

import type { DnAttrDefinition, AttrHost } from './models.ts';

/** Handles a component attributes */
export class AttributesBag {
  private readonly _attr: Map<string, AttributeMap<unknown>> = new Map();
  private readonly _anyChange = new Subject<string>();
  private readonly _element: AttrHost;

  public constructor(target: AttrHost, attrDefs: DnAttrDefinition<unknown>[]) {
    this._element = target;
    this.__initAttributes(attrDefs);
  }

  /** Triggers when any property changes */
  public get onChange(): IObservable<string> {
    return this._anyChange;
  }

  /** Set new value for attribute */
  public valueChanged(name: string, old: string, val: string): void {
    if (old === val) return;
    const map = this._attr.get(name);
    if (!map) return;
    const nValue = map.fromString(val);
    const oValue = map.fromString(old);
    if (nValue === oValue) return;
    map.mapValue.next(nValue);
  }

  /** Get attribute observable */
  public getAttr<T>(name: string): IValueObservable<T> {
    const map = this._attr.get(name) as AttributeMap<T>;
    if (!map) throw new Error(`Attribute ${name} not found in ${this._element.tagName}`);
    return map.mapValue;
  }

  private __initAttributes(list: DnAttrDefinition<unknown>[]): void {
    for (const attr of list) {
      const map = createAttMap(attr, this._element);
      map.strValue.subscribe({
        next: () => this._anyChange.next(attr.name)
      });
      this._attr.set(attr.name, map);
    }
  }
}

interface AttributeMap<T> {
  readonly name: string;
  strValue: ValueSubject<string>;
  mapValue: ValueSubject<T>;
  toString: (e: T) => string;
  fromString: (s: string) => T;
}

function createAttMap<T>(att: DnAttrDefinition<T>, target: AttrHost): AttributeMap<T> {
  const item: AttributeMap<T> = {
    name: att.name,
    mapValue: new ValueSubject(att.default),
    strValue: new ValueSubject(''),
    toString: att.toString ?? String,
    fromString: att.fromString ?? String as unknown as (s: string) => T,
  };

  item.strValue
    .subscribe({ next: v => {target.setAttribute(att.name, v)} });

  item.mapValue
    .subscribe({ next: v => item.strValue.next(item.toString(v)) });

  return item;
}
