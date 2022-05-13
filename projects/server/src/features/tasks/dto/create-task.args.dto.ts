import { ArgsType } from '@nestjs/graphql';

import { WithData } from '../../../common/dto/with-data.args.dto';
import { TaskCreateInput } from './task-create.input.dto';

@ArgsType()
export class CreateTaskArgs extends WithData.for(() => TaskCreateInput) {}
