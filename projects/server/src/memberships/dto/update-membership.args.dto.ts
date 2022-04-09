import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { WithId } from '../../common/dto/with-id.args.dto';
import { MembershipUpdateInput } from './membership-update.input.dto';

@ArgsType()
export class UpdateMembershipArgs extends IntersectionType(
  WithId,
  WithData.for(() => MembershipUpdateInput),
) {}
