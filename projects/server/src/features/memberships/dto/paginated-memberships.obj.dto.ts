import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '../../../common/dto/paginated.obj.dto';
import { Membership } from '../entities/membership.entity';

@ObjectType()
export class PaginatedMemberships extends Paginated.for(() => Membership) {}
