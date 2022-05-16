import { AsyncLocalStorage } from 'async_hooks';
import { Request } from 'express';

import { User } from '../features/users/entities/user.entity';

/**
 * @deprecated Use normal methods instead
 */
export class Context {
  static get current(): Context {
    return this.storage.getStore()!;
  }

  private static storage = new AsyncLocalStorage<Context>();

  constructor(private request: Request) {}

  get user(): User {
    return this.request.user!;
  }

  apply<T>(fn: () => T): T {
    return Context.storage.run(this, fn);
  }
}
