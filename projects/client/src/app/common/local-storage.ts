import { BehaviorSubject } from 'rxjs';

export class LocalStorageItem<Value> {
  value!: Value;
  value$$!: BehaviorSubject<Value>;

  constructor(
    public key: string,
    private validator: (dirty: unknown) => boolean,
    private initial: Value | (() => Value),
  ) {
    this.load().save();
  }

  /**
   * Update the current value.
   * @param value
   * @returns
   */
  next<Next extends Value>(value: Next): LocalStorageItem<Next> {
    this.value = value;
    if (this.value$$) this.value$$.next(value);
    else this.value$$ = new BehaviorSubject<Value>(value);
    return this as unknown as LocalStorageItem<Next>;
  }

  /**
   * Load a value from `LocalStorage` and overwrite the current one.
   * @returns
   */
  load(): this {
    const VALUE_NOT_EXIST = Symbol();
    const VALUE_NOT_VALID = Symbol();
    try {
      const raw = localStorage.getItem(this.key);
      if (raw === null) throw VALUE_NOT_EXIST;
      const dirty = JSON.parse(raw);
      if (!this.validator(dirty)) throw VALUE_NOT_VALID;
      const validated = dirty;
      this.next(validated);
    } catch (error) {
      if (
        error === VALUE_NOT_EXIST ||
        error === VALUE_NOT_VALID ||
        error instanceof SyntaxError
      ) {
        const initial =
          this.initial instanceof Function ? this.initial() : this.initial;
        this.next(initial);
      } else {
        throw error;
      }
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return this;
    }
  }

  /**
   * Save the current value to `LocalStorage`.
   * @returns
   */
  save(): this {
    localStorage.setItem(this.key, JSON.stringify(this.value));
    return this;
  }
}
