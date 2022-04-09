import { ArgsType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { RoomCreateInput } from './room-create.input.dto';

@ArgsType()
export class CreateRoomArgs extends WithData.for(() => RoomCreateInput) {}
