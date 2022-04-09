import { AnyEntity, EntityManager, FilterQuery } from '@mikro-orm/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { IsPrimaryKey } from './is-primary-key.decorator';
import { ValidationArguments } from './validation-arguments.interface';

type IsPrimaryKeyValidationContext = ValidationArguments<
  Parameters<typeof IsPrimaryKey>
>;

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
