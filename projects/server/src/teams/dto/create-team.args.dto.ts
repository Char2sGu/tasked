import { ArgsType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { TeamCreateInput } from './team-create.input.dto';

@ArgsType()
export class CreateTeamArgs extends WithData.for(() => TeamCreateInput) {}
