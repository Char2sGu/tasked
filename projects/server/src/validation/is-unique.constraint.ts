import { EntityManager } from '@mikro-orm/knex';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { IsUnique } from './is-unique.decorator';
import { ValidationArguments } from './validation-arguments.interface';

type IsUniqueValidationContext = ValidationArguments<
  Parameters<typeof IsUnique>
>;

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private em: EntityManager) {}

  async validate<Entity, Field extends keyof Entity>(
    value: Entity[Field],
    context: IsUniqueValidationContext,
  ): Promise<boolean> {
    const [entityType, field, filters] = context.constraints;
    const result = await this.em.findOne(
      entityType(),
      { [field]: value },
      { filters },
    );
    return !result;
  }

  defaultMessage(context: IsUniqueValidationContext): string {
    return `${context.property} must be unique`;
  }
}
