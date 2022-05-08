import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import { Server } from 'http';
import { AddressInfo } from 'node:net';
import supertest from 'supertest';

import { Affair } from '../../src/affairs/entities/affair.entity';
import { AppModule } from '../../src/app.module';
import { Application } from '../../src/applications/entities/application.entity';
import { Assignment } from '../../src/assignments/entities/assignment.entity';
import { Membership } from '../../src/memberships/entities/membership.entity';
import { Task } from '../../src/tasks/entities/task.entity';
import { Team } from '../../src/teams/entities/team.entity';
import { User } from '../../src/users/entities/user.entity';
import { GraphQLClient } from './graphql-client.class';

export async function prepareE2E({
  debug,
  ...metadata
}: PrepareE2EOptions = {}): Promise<PrepareE2EResult> {
  const module = await Test.createTestingModule({
    imports: [
      MikroOrmModule.forRoot({
        type: 'sqlite',
        dbName: ':memory:',
        entities: [
          User,
          Membership,
          Team,
          Application,
          Affair,
          Task,
          Assignment,
        ],
        forceUndefined: true,
        debug,
      }),
      ...(Reflect.getMetadata('imports', AppModule) as any[]).slice(1),
      ...(metadata.imports ?? []),
    ],
    controllers: [
      ...(Reflect.getMetadata('controllers', AppModule) ?? []),
      ...(metadata.controllers ?? []),
    ],
    providers: [
      ...(Reflect.getMetadata('providers', AppModule) ?? []),
      ...(metadata.providers ?? []),
    ],
  }).compile();

  const schemaGenerator = module.get(MikroORM).getSchemaGenerator();
  await schemaGenerator.execute(await schemaGenerator.generate());

  const app = module.createNestApplication();
  await app.listen(0); // start own http server, otherwise supertest will create one internally
  const server: Server = app.getHttpServer();
  const address = server.address() as AddressInfo;
  const requester = supertest(server);
  const client = new GraphQLClient(`http://127.0.0.1:${address.port}/graphql/`);

  useContainer(app, { fallbackOnErrors: true });

  return { module, app, server, address, requester, client };
}

interface PrepareE2EOptions extends ModuleMetadata {
  debug?: boolean;
}

interface PrepareE2EResult {
  module: TestingModule;
  app: INestApplication;
  server: Server;
  address: AddressInfo;
  requester: supertest.SuperTest<supertest.Test>;
  client: GraphQLClient;
}
