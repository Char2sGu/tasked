import { ArgsType } from '@nestjs/graphql';

import { WithId } from '../../common/dto/with-id.args.dto';

@ArgsType()
export class DeleteAssignmentArgs extends WithId {}
