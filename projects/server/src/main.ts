import { NestFactory } from '@nestjs/core';
import * as classValidator from 'class-validator';

import { AppModule } from './app.module';
import { DbService } from './cli/db/db.service';
import { PORT } from './common/env.constants';

// TODO: restructure CLI functions

async function bootstrap() {
  const [, , action] = process.argv;

  if (!action) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    // Use Nest DI in class-validator custom validators.
    // https://github.com/nestjs/nest/issues/528#issuecomment-403212561
    classValidator.useContainer(app.select(AppModule), {
      fallbackOnErrors: true,
    });

    await app.listen(PORT);
  } else {
    const app = await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    });
    app.useLogger(false);
    if (action == 'db:init') await app.get(DbService).init();
    if (action == 'db:seed') await app.get(DbService).seed();
    await app.close();
  }
}
bootstrap();
