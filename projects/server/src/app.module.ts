import { Module } from '@nestjs/common';
import { DataLoaderModule } from '@nestjs-devkit/dataloader';
import { MikroFlusherModule } from '@nestjs-devkit/mikro-graphql-flusher';

import { ApplicationsModule } from './applications/applications.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';
import { CliModule } from './cli/cli.module';
import { ContextModule } from './context/context.module';
import { CoreModule } from './core/core.module';
import { GraphqlModule } from './graphql/graphql.module';
import { MembershipsModule } from './memberships/memberships.module';
import { MikroModule } from './mikro/mikro.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { ValidationModule } from './validation/validation.module';

// TODO: user email
// TODO: replace applications with invitations
// TODO: option to hide task after all assignments are done
// TODO: order of tasks and assignments
// TODO: initial exclusive team for user
// TODO: assignment steps
// TODO: server-sent event
// TODO: support sync with offline client
// TODO: complete error messages and error codes

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
    TeamsModule,
    MembershipsModule,
    ApplicationsModule,
    TasksModule,
    AssignmentsModule,
    CliModule,
  ],
})
export class AppModule {}
