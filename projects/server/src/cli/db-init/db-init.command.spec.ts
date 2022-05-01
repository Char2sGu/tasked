import { Test, TestingModule } from '@nestjs/testing';

import { DbInitCommand } from './db-init.command';

describe('DbInitCommand', () => {
  let service: DbInitCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbInitCommand],
    }).compile();

    service = module.get<DbInitCommand>(DbInitCommand);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
