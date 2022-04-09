import { ArgsType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { ApplicationCreateInput } from './application-create.input.dto';

@ArgsType()
export class CreateApplicationArgs extends WithData.for(
  () => ApplicationCreateInput,
) {}
