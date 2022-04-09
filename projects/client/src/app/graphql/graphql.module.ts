import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpBatchLink } from 'apollo-angular/http';

import { GraphqlAuthInterceptor } from './graphql-auth.interceptor';

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (
        httpBatchLinkFactory: HttpBatchLink,
      ): ApolloClientOptions<NormalizedCacheObject> => ({
        link: httpBatchLinkFactory.create({ uri: '/graphql/' }),
        cache: new InMemoryCache({
          typePolicies: {
            Query: {
              fields: {
                room: {
                  // use the existing cache if possible
                  read: (_, { args, toReference }) =>
                    toReference({ __typename: 'Room', id: args!['id'] }),
                },
              },
            },
          },
        }),
      }),
      deps: [HttpBatchLink],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GraphqlAuthInterceptor,
      multi: true,
    },
  ],
})
export class GraphqlModule {}
