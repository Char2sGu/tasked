import { Module } from '@nestjs/common';
import { DataLoaderModule } from '@nestjs-devkit/dataloader';
import { MikroFlusherModule } from '@nestjs-devkit/mikro-graphql-flusher';
import { MailerModule } from '@nestjs-modules/mailer';

import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';
import { CliModule } from './cli/cli.module';
import { EMAIL_FROM, EMAIL_TRANSPORT } from './common/env.constants';
import { ContextModule } from './context/context.module';
import { CoreModule } from './core/core.module';
import { GraphqlModule } from './graphql/graphql.module';
import { MembershipRequestsModule } from './membership-requests/membership-requests.module';
import { MembershipsModule } from './memberships/memberships.module';
import { MikroModule } from './mikro/mikro.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { ValidationModule } from './validation/validation.module';
import { VerificationsModule } from './verifications/verifications.module';

// TODO: implement invitations
// TODO: option to hide task after all assignments are done
// TODO: order of tasks and assignments
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
    MailerModule.forRoot({
      transport: EMAIL_TRANSPORT,
      defaults: { from: EMAIL_FROM },
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    MembershipsModule,
    MembershipRequestsModule,
    TasksModule,
    AssignmentsModule,
    CliModule,
    VerificationsModule,
  ],
})
export class AppModule {}
