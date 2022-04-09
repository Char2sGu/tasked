import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '../../common/dto/paginated.obj.dto';
import { Room } from '../entities/room.entity';

@ObjectType()
export class PaginatedRooms extends Paginated.for(() => Room) {}
