import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { WithId } from '../../common/dto/with-id.args.dto';
import { AssignmentUpdateInput } from './assignment-update.input.dto';

@ArgsType()
export class UpdateAssignmentArgs extends IntersectionType(
  WithId,
  WithData.for(() => AssignmentUpdateInput),
) {}
