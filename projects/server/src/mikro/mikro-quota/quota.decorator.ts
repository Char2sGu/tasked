import { AnyEntity, Collection } from '@mikro-orm/core';

import { MikroQuotaService } from './mikro-quota.service';
import { QUOTA } from './quota.symbol';

/**
 * Define the quota of a collection field for the service to check.
 * @param quota
 * @returns
 * @see MikroQuotaService.check
 */
export const Quota =
  (quota: number) =>
  <Entity extends AnyEntity>(
    prototype: Entity,
    field: CollectionField<Entity>,
  ): void =>
    Reflect.defineMetadata(QUOTA, quota, prototype, field);

export type CollectionField<Entity> = {
  [Field in keyof Entity]: Entity[Field] extends Collection<any>
    ? Field
    : never;
}[Extract<keyof Entity, string>];

MikroQuotaService;
