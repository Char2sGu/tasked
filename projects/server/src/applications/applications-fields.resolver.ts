import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { RoomRefLoader } from '../rooms/room-ref.loader';
import { UserRefLoader } from '../users/user-ref.loader';
import { Application } from './entities/application.entity';

@Resolver(() => Application)
export class ApplicationsFieldsResolver {
  constructor(
    private userRefLoader: UserRefLoader,
    private roomRefLoader: RoomRefLoader,
  ) {}

  @ResolveField()
  async owner(@Parent() entity: Application) {
    return this.userRefLoader.load(entity.owner);
  }

  @ResolveField()
  async room(@Parent() entity: Application) {
    return this.roomRefLoader.load(entity.room);
  }
}
