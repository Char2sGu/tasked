import { AnyEntity, Collection } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { MikroQuotaError } from './mikro-quota.error';
import { CollectionField } from './quota.decorator';
import { QUOTA } from './quota.symbol';

@Injectable()
export class MikroQuotaService {
  /**
   * Check whether the specified `Collection` field's defined quota is
   * exceeded.
   *
   * The collection must have been initialized before.
   *
   * @param entity
   * @param field
   */
  async check<Entity extends object>(
    entity: Entity,
    field: CollectionField<Entity>,
  ): Promise<void> {
    const quota: number | undefined = Reflect.getMetadata(QUOTA, entity, field);
    if (quota === undefined) throw new Error('Quota not defined');

    const collection = entity[field] as unknown as Collection<AnyEntity>;
    if (!collection.isInitialized())
      throw new Error('Collection not initialized');

    const count = collection.count();
    if (count >= quota) throw new MikroQuotaError(entity, field, quota, count);
  }
}
