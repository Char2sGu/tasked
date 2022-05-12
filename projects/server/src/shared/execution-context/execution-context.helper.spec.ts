import { Test, TestingModule } from '@nestjs/testing';

import { ExecutionContextHelper } from './execution-context.helper';

describe('ExecutionContextHelper', () => {
  let service: ExecutionContextHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionContextHelper],
    }).compile();

    service = module.get<ExecutionContextHelper>(ExecutionContextHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
