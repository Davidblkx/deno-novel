// deno-lint-ignore-file no-explicit-any
import type { DnElement } from "./dn-element.ts";
import type { Type } from "../../../utils/types.ts";

/** Result of a render function */
export type RenderResult = string | Node | Node[];

/** Definition to register an element */
export interface ElemDefinition<T extends DnElement<T>> {
  /** The tag name of the element */
  tagName: string;
  /** The element class */
  constructor: Type<T>;
  /** Element attributes */
  attr: DnAttrDefinition<any>[];
  /** Description for component */
  description?: string;
  /** Skip component when showing documentation */
  skipDocs?: boolean;
}

/** Attribute details */
export interface DnAttrDefinition<T> {
  /** The name of the property */
  name: string;
  /** The type of the property */
  type: string;
  /** The default value of the property */
  default: T;
  /** The description of the property */
  description?: string;
  /** Map value to string */
  toString?: (e: T) => string;
  /** Map value from string */
  fromString?: (s: string) => T;
  /** changes trigger a new render, defaults to true */
  triggerRender: boolean;
}

export interface AttrHost {
  /** Host tag name */
  tagName: string;

  /** Set a attribute */
  setAttribute(name: string, value: string): void;
}
