import {
  AnyEntity,
  EntityManager,
  FilterQuery,
  FindOneOptions,
} from '@mikro-orm/core';
import { Type } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ValidationArguments } from './validation-arguments.interface';

export const IsPrimaryKey =
  <Entity>(
    entityType: () => Type<Entity>,
    filters?: FindOneOptions<never>['filters'],
    options?: ValidationOptions,
  ) =>
  ({ constructor: target }: object, propertyName: string): void =>
    registerDecorator({
      constraints: [entityType, filters],
      options,
      target,
      propertyName,
      validator: IsPrimaryKeyConstraint,
    });

@ValidatorConstraint({ async: true })
export class IsPrimaryKeyConstraint implements ValidatorConstraintInterface {
  constructor(private em: EntityManager) {}

  async validate(
    value: FilterQuery<AnyEntity>,
    context: IsPrimaryKeyValidationContext,
  ): Promise<boolean> {
    const [entityType, filters] = context.constraints;
    return this.em
      .findOne(entityType(), value, { filters })
      .then((result) => !!result);
  }

  defaultMessage(context: IsPrimaryKeyValidationContext): string {
    const entityName = context.constraints[0]().name;
    return `${context.property} must be a primary key of an existing or accessible ${entityName} entity`;
  }
}

type IsPrimaryKeyValidationContext = ValidationArguments<
  Parameters<typeof IsPrimaryKey>
>;
