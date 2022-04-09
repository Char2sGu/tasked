import { TestBed } from '@angular/core/testing';

import { GraphqlAuthInterceptor } from './graphql-auth.interceptor';

describe('GraphqlAuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GraphqlAuthInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: GraphqlAuthInterceptor = TestBed.inject(
      GraphqlAuthInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
