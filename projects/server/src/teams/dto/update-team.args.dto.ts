import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { WithId } from '../../common/dto/with-id.args.dto';
import { TeamUpdateInput } from './team-update.input.dto';

@ArgsType()
export class UpdateTeamArgs extends IntersectionType(
  WithId,
  WithData.for(() => TeamUpdateInput),
) {}
