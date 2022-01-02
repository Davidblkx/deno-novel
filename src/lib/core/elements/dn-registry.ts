import type { Type } from "../../../utils/types.ts";
import type { DnElement, ElemDefinition } from "./dn-element.ts";

import { DnEvents } from '../events/__.ts';

/** Handler for custom web components initialization */
export class IDenoNovelRegistry {
  /** The registered elements */
  // deno-lint-ignore no-explicit-any
  private readonly _elements: Map<string, ElemDefinition<DnElement<any>>> = new Map();

  /** Defines if initialization is completed */
  private _hasInit = false;

  /** register a new element */
  public register<T extends DnElement<T>>(elem: Type<T>): void {

    // Get the definition
    const definition = elem.prototype.constructor.definition;

    if (!definition) {
      throw new Error(`Element ${elem.name} has no definition`);
    }

    // Check if the definition is valid
    if (this._hasInit && this._elements.has(definition.tagName)) {
      throw new Error(`Element ${definition.tagName} already registered`);
    }

    // Add the element to the registry
    this._elements.set(definition.tagName, definition);

    // Initialize the element if the registry is already initialized
    if (this._hasInit) { this.initElement(definition); }
  }

  /** Initialize all registered elements */
  public init(): void {
    DnEvents.emit('initStart');
    this._hasInit = true;
    this._elements.forEach((definition) => this.initElement(definition));
    DnEvents.emit('initEnd');
  }

  /** Initialize a single element */
  private initElement<T extends DnElement<T>>(definition: ElemDefinition<T>): void {
    customElements.define(definition.tagName, definition.constructor);
    DnEvents.emit('elementRegistered', definition.tagName);
  }
}

/** Default element registry */
export const DnRegistry = new IDenoNovelRegistry();
