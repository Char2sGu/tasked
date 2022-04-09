import { TestBed } from '@angular/core/testing';

import { PostponementInterceptor } from './postponement.interceptor';

describe('PostponementInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [PostponementInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: PostponementInterceptor = TestBed.inject(
      PostponementInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
