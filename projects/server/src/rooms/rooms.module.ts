import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';

import { ApplicationsModule } from '../applications/applications.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { Membership } from '../memberships/entities/membership.entity';
import { MembershipsModule } from '../memberships/memberships.module';
import { SharedModule } from '../shared/shared.module';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { Room } from './entities/room.entity';
import { RoomMembershipLoader } from './room-membership.loader';
import { RoomRefLoader } from './room-ref.loader';
import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';
import { RoomsFieldsResolver } from './rooms-fields.resolver';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([Room, Membership]),
    forwardRef(() => UsersModule),
    forwardRef(() => ApplicationsModule),
    forwardRef(() => MembershipsModule),
    forwardRef(() => TasksModule),
    forwardRef(() => AssignmentsModule),
  ],
  providers: [
    RoomsResolver,
    RoomsFieldsResolver,
    RoomsService,
    RoomRefLoader,
    RoomMembershipLoader,
  ],
  exports: [RoomsService, RoomRefLoader],
})
export class RoomsModule {}
