import {
  debounce,
  IValueObservable,
  Subject,
} from '../reactive/__.ts';
import { AttributesBag } from './attributes-bag.ts';
import {
  ElemDefinition,
  RenderResult,
} from './models.ts';

/** Base for an element to be loaded as a web component */
export abstract class DnElement<T extends DnElement<T>> extends HTMLElement {

  // deno-lint-ignore no-explicit-any
  public static readonly definition?: ElemDefinition<any>;

  private readonly _renderSubject = new Subject<void>();
  private readonly _attrBag: AttributesBag;

  /** Attributes to observe */
  public static get observedAttributes(): string[] {
    return (this.definition?.attr ?? []).map(a => a.name);
  }

  public constructor() {
    super();
    this.__validateDefinition();
    this._attrBag = this.__initBag();
    this._renderSubject
      .pipe(debounce(50)) // Wait for 50ms before rendering
      .subscribe({ next: () => this.__applyRender() });
  }

  public triggerRender(): void {
    this._renderSubject.next();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    this._attrBag.valueChanged(name, oldValue, newValue);
  }

  public connectedCallback(): void {
    this.triggerRender();
    this.onMount();
  }

  public disconnectedCallback(): void {
    this.onUnmount();
  }

  /** Render current component, if string set as innnerHtml */
  protected abstract render(): RenderResult | Promise<RenderResult>;

  /** Get definition */
  protected getDefinition(): ElemDefinition<T> {
    return (this.constructor as unknown as { definition: ElemDefinition<T> }).definition;
  }

  /** Return attribute mapped value */
  protected attr<T>(name: string): IValueObservable<T> {
    return this._attrBag.getAttr<T>(name);
  }

  /** Runs after connectedCallback */
  protected onMount(): void | Promise<void> {}

  /** Runs after disconnectedCallback */
  protected onUnmount(): void | Promise<void> {}

  /** Runs before render starts */
  protected onBeforeRender(): void | Promise<void> {}

  /** Runs after render ends */
  protected onAfterRender(): void | Promise<void> {}

  /** Validates that element has a definition */
  private __validateDefinition(): void {
    if (!(this.constructor as unknown as { definition: undefined }).definition) {
      throw new Error(`Definition not found for ${this.constructor.name}`);
    }
  }

  private __initBag(): AttributesBag {
    const def = this.getDefinition();
    const bag = new AttributesBag(this, def.attr);
    bag.onChange.subscribe({ next: () => this.triggerRender() });
    return bag;
  }

  private async __applyRender(): Promise<void> {
    await this.onBeforeRender();
    const render = this.render();
    const result = render instanceof Promise ? await render : render;
    const toRender: (string | Node)[] = Array.isArray(result) ? result : [result];
    if (!this.isConnected) return;

    // Clear previous content
    while (this.firstChild) { this.removeChild(this.firstChild); }

    for (const elem of toRender) {
      if (typeof elem === 'string')
        this.innerHTML = elem;
      else
        this.appendChild(elem);
    }
    this.onAfterRender();
  }
}

