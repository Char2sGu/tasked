import { ArgsType } from '@nestjs/graphql';

import { WithData } from '../../../common/dto/with-data.args.dto';
import { MembershipRequestCreateInput } from './membership-request-create.input.dto';

@ArgsType()
export class CreateMembershipRequestArgs extends WithData.for(
  () => MembershipRequestCreateInput,
) {}
