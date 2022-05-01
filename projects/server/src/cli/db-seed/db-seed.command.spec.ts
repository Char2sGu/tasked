import { Test, TestingModule } from '@nestjs/testing';

import { DbSeedCommand } from './db-seed.command';

describe('DbSeedCommand', () => {
  let service: DbSeedCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbSeedCommand],
    }).compile();

    service = module.get<DbSeedCommand>(DbSeedCommand);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
