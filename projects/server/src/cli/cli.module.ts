import { Module } from '@nestjs/common';

import { DbInitCommand } from './db-init/db-init.command';
import { DbSeedCommand } from './db-seed/db-seed.command';

@Module({
  providers: [DbInitCommand, DbSeedCommand],
})
export class CliModule {}
