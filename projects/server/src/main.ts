import { NestFactory } from '@nestjs/core';
import * as classValidator from 'class-validator';
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
    // Use Nest DI in class-validator custom validators.
    // https://github.com/nestjs/nest/issues/528#issuecomment-403212561
    classValidator.useContainer(app.select(AppModule), {
      fallbackOnErrors: true,
    });
    await app.listen(PORT);
  }
}
bootstrap();
