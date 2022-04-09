import { GraphQLClient as GraphQLClientBase } from 'graphql-request';

export class GraphQLClient extends GraphQLClientBase {
  setToken(token?: string): GraphQLClientBase {
    return this.setHeader('Authorization', token ? `Bearer ${token}` : '');
  }
}
