import type { Type } from "../../../utils/types.ts";
import type { DnElement } from "./dn-element.ts";

import { DnEvents } from '../events/__.ts';
import { isElemDefinition } from './guards.ts';
import { ElemDefinition } from './models.ts';

/** Handler for custom web components initialization */
export class IDenoNovelRegistry {
  /** The registered elements */
  // deno-lint-ignore no-explicit-any
  private readonly _elements: Map<string, ElemDefinition<DnElement<any>>> = new Map();

  /** Defines if initialization is completed */
  private _hasInit = false;

  /**
   * Register a new custom component
   *
   * @param elem The element to get the definition for
   */
  public register<T extends DnElement<T>>(elem: Type<T>): void
  /**
   * Register a new custom component
   *
   * @param elem The definition of the element to register
   */
  public register<T extends DnElement<T>>(elem: ElemDefinition<T>): void
  public register<T extends DnElement<T>>(elem: Type<T> | ElemDefinition<T>): void {

    // Get the definition
    const definition = isElemDefinition(elem) ? elem : elem.prototype.constructor.definition;

    if (!definition) {
      throw new Error(`Element ${(elem as unknown as Type<T>).name} has no definition`);
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
