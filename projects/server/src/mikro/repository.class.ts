import {
  EntityRepository,
  FilterQuery,
  FindOptions,
  New,
  RequiredEntityData,
} from '@mikro-orm/core';

export class Repository<Entity> extends EntityRepository<Entity> {
  /**
   * Replace the return value of {@link EntityRepository.findAndCount} with an
   * object.
   * @param where
   * @param options
   * @returns
   */
  async findAndPaginate(
    where: FilterQuery<Entity>,
    options?: FindOptions<Entity, never>,
  ): Promise<RepositoryPaginationResult<Entity>> {
    const [results, total] = await super.findAndCount(where, options);
    return { total, results };
  }

  /**
   * Persist the created entity by default.
   * @param data
   * @param persist
   * @returns
   */
  create<Populate extends string = any>(
    data: RequiredEntityData<Entity>,
    persist = true,
  ): New<Entity, Populate> {
    const result = super.create(data);
    if (persist) this.persist(result);
    return result as New<Entity, Populate>;
  }

  /**
   * Returns the removed entity rather than `this`.
   * @param entity
   * @returns
   */
  delete(entity: Entity): Entity {
    this.remove(entity);
    return entity;
  }
}

export interface RepositoryPaginationResult<Entity> {
  total: number;
  results: Entity[];
}
