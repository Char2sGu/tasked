import { Plugin } from '@nestjs/apollo';
import { Inject } from '@nestjs/common';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

import { GRAPHQL_COMPLEXITY_MAX } from './graphql-complexity-max.token';

@Plugin()
export class GraphqlComplexityPlugin implements ApolloServerPlugin {
  constructor(@Inject(GRAPHQL_COMPLEXITY_MAX) private max: number) {}

  async requestDidStart(): Promise<GraphQLRequestListener> {
    const listener: GraphQLRequestListener = {
      didResolveOperation: async ({
        document: query,
        schema,
        operationName,
        request: { variables },
      }) => {
        const current = getComplexity({
          schema,
          query,
          operationName: operationName ?? undefined,
          variables,
          estimators: [fieldExtensionsEstimator(), simpleEstimator()],
        });
        if (current > this.max)
          throw new GraphQLError(`Complexity exceeded: ${current}/${this.max}`);
      },
    };
    return listener;
  }
}
