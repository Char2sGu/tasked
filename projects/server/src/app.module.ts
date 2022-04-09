import { Module } from '@nestjs/common';
import { DataLoaderModule } from '@nestjs-devkit/dataloader';
import { MikroFlusherModule } from '@nestjs-devkit/mikro-graphql-flusher';

import { ApplicationsModule } from './applications/applications.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';
import { ContextModule } from './context/context.module';
import { CoreModule } from './core/core.module';
import { GraphqlModule } from './graphql/graphql.module';
import { MembershipsModule } from './memberships/memberships.module';
import { MikroModule } from './mikro/mikro.module';
import { RoomsModule } from './rooms/rooms.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ContextModule,
    MikroModule.forRoot(),
    MikroFlusherModule,
    GraphqlModule,
    ValidationModule.forRoot(),
    DataLoaderModule.forRoot(),
    CoreModule,
    AuthModule,
    UsersModule,
    RoomsModule,
    MembershipsModule,
    ApplicationsModule,
    TasksModule,
    AssignmentsModule,
  ],
})
export class AppModule {}
