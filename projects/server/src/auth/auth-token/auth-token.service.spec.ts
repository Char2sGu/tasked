import { Test, TestingModule } from '@nestjs/testing';

import { AuthTokenService } from './auth-token.service';

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthTokenService],
    }).compile();

    service = module.get<AuthTokenService>(AuthTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
