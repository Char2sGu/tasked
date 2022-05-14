import {
  EntityRepository,
  FilterQuery,
  FindOptions,
  New,
  RequiredEntityData,
} from '@mikro-orm/core';

import { Page } from '../common/dto/pagination.dtos';

export class Repository<Entity> extends EntityRepository<Entity> {
  /**
   * Replace the return value of {@link EntityRepository.findAndCount} with an
   * object.
   * @deprecated Use {@link findPage} instead
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

  async findPage(
    where: FilterQuery<Entity>,
    options?: FindOptions<Entity, never>,
  ): Promise<Page<Entity>> {
    const [items, total] = await super.findAndCount(where, options);
    return { total, items };
  }

  /**
   * Persist the created entity by default.
   * @param data
   * @param persist
   * @returns
   */
  override create<Populate extends string = any>(
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
