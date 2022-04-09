import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module, NotFoundException } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DB_PATH, DEBUG } from '../common/env.constants';
import { Repository } from '../mikro/repository.class';
import { MikroMiddlewareModule } from './mikro-middleware.module';
import { MikroQuotaFilter } from './mikro-quota/mikro-quota.filter';
import { MikroQuotaService } from './mikro-quota/mikro-quota.service';

/**
 * Generic MikroORM toolkit isolated from business.
 */
@Module({})
export class MikroModule {
  static forRoot(): DynamicModule {
    return {
      module: MikroModule,
      imports: [
        MikroOrmModule.forRoot({
          type: 'sqlite',
          dbName: DB_PATH,
          autoLoadEntities: true,
          forceUndefined: true,
          findOneOrFailHandler: () => new NotFoundException(),
          entityRepository: Repository,
          debug: DEBUG,
        }),
        MikroMiddlewareModule,
      ],
      providers: [
        {
          provide: APP_FILTER,
          useClass: MikroQuotaFilter,
        },
      ],
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: MikroModule,
      providers: [MikroQuotaService],
      exports: [MikroQuotaService],
    };
  }
}
