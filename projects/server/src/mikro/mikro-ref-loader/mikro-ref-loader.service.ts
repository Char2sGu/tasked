import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { EntityRefLoader } from '../../common/entity-ref-loader.class';
import { MikroRefLoaderContext } from './mikro-ref-loader-context.class';
import { MikroRefLoaderDataLoader } from './mikro-ref-loader-data-loader.class';

/**
 * @deprecated
 * @see {EntityRefLoader}
 */
@Injectable()
export class MikroRefLoaderService {
  constructor(private em: EntityManager) {}

  /**
   * Combine loadings of any uninitialized entities during a single *tick* into
   * much fewer queries to avoid the N+1 issue.
   */
  async load<Entity extends object>(ref: Entity): Promise<Entity> {
    const type = ref.constructor.name;
    const entity = this.em.getUnitOfWork().tryGetById(type, ref);
    return entity && wrap(entity).isInitialized()
      ? entity
      : this.getLoader<Entity>(type).load(ref);
  }

  private getLoader<Entity>(type: string): MikroRefLoaderDataLoader<Entity> {
    const loaders = MikroRefLoaderContext.current.loaders;
    return (
      loaders[type] ?? (loaders[type] = new MikroRefLoaderDataLoader(this.em))
    );
  }
}

EntityRefLoader;
