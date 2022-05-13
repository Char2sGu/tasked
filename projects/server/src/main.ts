import { NestFactory } from '@nestjs/core';
import { CommandFactory } from 'nest-commander';

import { AppModule } from './app.module';
import { PORT } from './common/env.constants';

async function bootstrap() {
  const [, , ...args] = process.argv;

  if (args.length) {
    await CommandFactory.run(AppModule, ['warn', 'error']);
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT);
  }
}
bootstrap();
