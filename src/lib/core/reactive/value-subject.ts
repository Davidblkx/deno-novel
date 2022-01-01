import { Subject } from './subject.ts';

/** Like Subject but allways emit the last value to subscribers */
export class ValueSubject<T> extends Subject<T> {
  private _value: T;

  public get value(): T {
    return this._value;
  }

  public constructor(value: T) {
    super();
    this._value = value;
  }

  public override next(value: T): Promise<void> {
    this._value = value;
    return super.next(value);
  }
}
