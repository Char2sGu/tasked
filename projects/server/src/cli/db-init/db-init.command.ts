import { MikroORM } from '@mikro-orm/core';
import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'db:init',
  description: 'Generate database schema according to the defined entities',
})
export class DbInitCommand implements CommandRunner {
  constructor(private orm: MikroORM) {}

  async run(): Promise<void> {
    const schemaGenerator = this.orm.getSchemaGenerator();
    await schemaGenerator.execute(await schemaGenerator.generate());
  }
}
