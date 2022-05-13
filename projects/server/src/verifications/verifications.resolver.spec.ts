import { Test, TestingModule } from '@nestjs/testing';

import { VerificationsResolver } from './verifications.resolver';
import { VerificationsService } from './verifications.service';

describe('VerificationsResolver', () => {
  let resolver: VerificationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationsResolver, VerificationsService],
    }).compile();

    resolver = module.get<VerificationsResolver>(VerificationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
