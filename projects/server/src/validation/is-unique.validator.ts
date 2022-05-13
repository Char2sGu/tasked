import { FindOptions } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/knex';
import { Type } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { registerDecorator, ValidationOptions } from 'class-validator';

import { ValidationArguments } from './validation-arguments.interface';

export const IsUnique =
  <Entity>(
    entityType: () => Type<Entity>,
    field: keyof Entity,
    filters?: FindOptions<never>['filters'],
    options?: ValidationOptions,
  ) =>
  ({ constructor: target }: object, propertyName: string): void =>
    registerDecorator({
      constraints: [entityType, field, filters],
      target,
      options,
      propertyName,
      validator: IsUniqueConstraint,
    });

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

type IsUniqueValidationContext = ValidationArguments<
  Parameters<typeof IsUnique>
>;
