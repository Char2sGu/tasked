import { DynamicModule, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { IsPrimaryKeyConstraint } from './is-primary-key.constraint';
import { IsUniqueConstraint } from './is-unique.constraint';
import { ValidationPipe } from './validation.pipe';

@Module({})
export class ValidationModule {
  static forRoot(): DynamicModule {
    return {
      module: ValidationModule,
      providers: [
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
      ],
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
