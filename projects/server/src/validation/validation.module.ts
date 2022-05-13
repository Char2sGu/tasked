import { DynamicModule, Module } from '@nestjs/common';
import { APP_PIPE, ModuleRef } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { IsPrimaryKeyConstraint } from './is-primary-key.validator';
import { IsUniqueConstraint } from './is-unique.validator';
import { ValidationPipe } from './validation.pipe';

@Module({})
export class ValidationModule {
  constructor(moduleRef: ModuleRef) {
    // https://github.com/nestjs/nest/issues/528#issuecomment-403212561
    useContainer(moduleRef, { fallbackOnErrors: true });
  }

  static forRoot(): DynamicModule {
    return {
      module: ValidationModule,
      providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: ValidationModule,
      providers: [IsPrimaryKeyConstraint, IsUniqueConstraint],
      exports: [IsPrimaryKeyConstraint, IsUniqueConstraint],
    };
  }
}
