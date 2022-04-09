import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import depthLimit from 'graphql-depth-limit';

import {
  DEBUG,
  GRAPHQL_COMPLEXITY,
  GRAPHQL_DEPTH,
  GRAPHQL_FREQUENCY_DURATION,
  GRAPHQL_FREQUENCY_LIMIT,
} from '../common/env.constants';
import { GraphqlComplexityPlugin } from './graphql-complexity.plugin';
import { GRAPHQL_COMPLEXITY_MAX } from './graphql-complexity-max.token';
import { GraphqlThrottlerGuard } from './graphql-throttler.guard';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: DEBUG,
      validationRules: [depthLimit(GRAPHQL_DEPTH)],
    }),
    ThrottlerModule.forRoot({
      limit: GRAPHQL_FREQUENCY_LIMIT,
      ttl: GRAPHQL_FREQUENCY_DURATION,
    }),
  ],
  providers: [
    GraphqlComplexityPlugin,
    { provide: GRAPHQL_COMPLEXITY_MAX, useValue: GRAPHQL_COMPLEXITY },
    { provide: APP_GUARD, useClass: GraphqlThrottlerGuard },
  ],
})
export class GraphqlModule {}
