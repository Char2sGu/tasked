import { ArgsType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { UserCreateInput } from './user-create.input.dto';

@ArgsType()
export class CreateUserArgs extends WithData.for(() => UserCreateInput) {}
