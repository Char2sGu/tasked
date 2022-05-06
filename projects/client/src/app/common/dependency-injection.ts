import { Provider, Type } from '@angular/core';

export abstract class Initializable {
  static provide(type: Type<Initializable>): Provider {
    return { provide: Initializable, useExisting: type, multi: true };
  }
  abstract init(): Promise<void>;
}
