import type { Type } from "../../../utils/types.ts";

/** Base for an element to be loaded as a web component */
export abstract class DnElement<T extends DnElement<T>> extends HTMLElement {

  // deno-lint-ignore no-explicit-any
  public static readonly definition?: ElemDefinition<any>;

  /** Attributes to observe */
  public static get observedAttributes(): string[] {
    return (this.definition?.attr ?? []).map(a => a.name);
  }

  public constructor() {
    super();
    this.__validateDefinition();
  }

  /** Render current component, if string set as innnerHtml */
  protected abstract render(): RenderResult | Promise<RenderResult>;


  /** Validates that element has a definition */
  private __validateDefinition(): void {
    if (!(this.constructor as unknown as { definition: undefined }).definition) {
      throw new Error(`Definition not found for ${this.constructor.name}`);
    }
  }
}

/** Result of a render function */
export type RenderResult = string | Node | Node[];

/** Definition to register an element */
export interface ElemDefinition<T extends DnElement<T>> {
  /** The tag name of the element */
  tagName: string;
  /** The element class */
  constructor: Type<T>;
  /** Element attributes */
  attr: DlAttrDefinition[];
}

/** Attribute details */
export interface DlAttrDefinition {
  /** The name of the property */
  name: string;
  /** The type of the property */
  type: string;
  /** The default value of the property */
  default?: unknown;
  /** The description of the property */
  description?: string;
}

