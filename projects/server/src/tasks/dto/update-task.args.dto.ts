import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { WithId } from '../../common/dto/with-id.args.dto';
import { TaskUpdateInput } from './task-update.input.dto';

@ArgsType()
export class UpdateTaskArgs extends IntersectionType(
  WithId,
  WithData.for(() => TaskUpdateInput),
) {}
