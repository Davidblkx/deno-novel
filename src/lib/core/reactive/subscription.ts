import type { ISubscription } from "./models.ts";

/** Handles observable subscriptions */
export class Subscription implements ISubscription {

  /** Action on cancel */
  private readonly action: () => void;

  private _canceled = false;

  public constructor(action: () => void) {
    this.action = action;
  }

  public unsubscribe(): void {
    if (this._canceled) { return; }
    this._canceled = true;
    this.action();
  }

  public get open(): boolean {
    return !this._canceled;
  }
}
