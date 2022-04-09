import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Room } from '../rooms/entities/room.entity';
import { RoomRefLoader } from '../rooms/room-ref.loader';
import { User } from '../users/entities/user.entity';
import { UserRefLoader } from '../users/user-ref.loader';
import { Application } from './entities/application.entity';

@Resolver(() => Application)
export class ApplicationsFieldsResolver {
  constructor(
    private userRefLoader: UserRefLoader,
    private roomRefLoader: RoomRefLoader,
  ) {}

  @ResolveField()
  async owner(@Parent() entity: Application): Promise<User> {
    return this.userRefLoader.load(entity.owner);
  }

  @ResolveField()
  async room(@Parent() entity: Application): Promise<Room> {
    return this.roomRefLoader.load(entity.room);
  }
}
