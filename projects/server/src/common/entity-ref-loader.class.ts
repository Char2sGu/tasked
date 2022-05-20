import { EntityRepository, wrap } from '@mikro-orm/core';
import { DataLoader } from '@nestjs-devkit/dataloader';

export abstract class EntityRefLoader<Entity> extends DataLoader<
  Entity,
  Entity
> {
  protected abstract repo: EntityRepository<Entity>;

  protected async resolve(refs: Entity[]): Promise<Entity[]> {
    const meta = wrap(refs[0], true).__meta;
    const primary = meta.primaryKeys[0];
    const keys = refs.map((ref) => ref[primary]);
    const filter: any = { [primary]: { $in: keys } };
    const entities: Entity[] = await this.repo.find(filter);
    const results = keys.map(
      (key) => entities.find((entity) => entity[primary] === key)!,
    );
    return results;
  }
}
