import {
  booleanAttr,
  DnElement,
  DnRegistry,
  htmlParser,
  RenderResult,
  stringAttr,
} from '../core/elements/__.ts';
import { DnEvents } from '../core/events/__.ts';

export class DnEventButton extends DnElement<DnEventButton> {

  public get text() { return this.attr<string>('text')?.value ?? ''; }
  public get event() { return this.attr<string>('event'); }
  public get disabled() {
    return this.attr<boolean>('disabled')?.value
      ? 'disabled': '';
  }

  protected render(): RenderResult {
    const btn = htmlParser<HTMLButtonElement>(/*html*/`
      <button ${this.disabled}>
        ${this.text}
      </button>
    `)

    btn.addEventListener('click', () => this.triggerEvent());

    return btn;
  }

  private triggerEvent() {
    // deno-lint-ignore no-explicit-any
    DnEvents.for<any>().emit(this.event.value);
  }
}

DnRegistry.register({
  constructor: DnEventButton,
  tagName: 'dn-event-button',
  description: 'A button that triggers an event',
  attr: [
    stringAttr('text', 'Button', true, 'Button text'),
    stringAttr('event', '', true, 'Event to trigger'),
    booleanAttr('disabled', false, true, 'Disabled state')
  ]
});
