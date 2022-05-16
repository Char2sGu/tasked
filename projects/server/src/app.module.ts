import { Module } from '@nestjs/common';
import { DataLoaderModule } from '@nestjs-devkit/dataloader';
import { MikroFlusherModule } from '@nestjs-devkit/mikro-graphql-flusher';
import { MailerModule } from '@nestjs-modules/mailer';

import { CliModule } from './cli/cli.module';
import { EMAIL_FROM, EMAIL_TRANSPORT } from './common/env.constants';
import { ContextModule } from './context/context.module';
import { CoreModule } from './core/core.module';
import { AssignmentsModule } from './features/assignments/assignments.module';
import { AuthModule } from './features/auth/auth.module';
import { MembershipInvitationsModule } from './features/membership-invitations/membership-invitations.module';
import { MembershipRequestsModule } from './features/membership-requests/membership-requests.module';
import { MembershipsModule } from './features/memberships/memberships.module';
import { TasksModule } from './features/tasks/tasks.module';
import { TeamsModule } from './features/teams/teams.module';
import { UsersModule } from './features/users/users.module';
import { VerificationsModule } from './features/verifications/verifications.module';
import { GraphqlModule } from './graphql/graphql.module';
import { MikroModule } from './mikro/mikro.module';
import { ValidationModule } from './validation/validation.module';

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
    MailerModule.forRoot({
      transport: EMAIL_TRANSPORT,
      defaults: { from: EMAIL_FROM },
    }),
    CoreModule,
    CliModule,
    AuthModule,
    UsersModule,
    TeamsModule,
    MembershipsModule,
    MembershipRequestsModule,
    MembershipInvitationsModule,
    TasksModule,
    AssignmentsModule,
    VerificationsModule,
  ],
})
export class AppModule {}
