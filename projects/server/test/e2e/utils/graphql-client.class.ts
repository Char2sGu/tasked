import { GraphQLClient as Base } from 'graphql-request';

export class GraphQLClient extends Base {
  setToken(token?: string) {
    return this.setHeader('Authorization', token ? `Bearer ${token}` : '');
  }
}
