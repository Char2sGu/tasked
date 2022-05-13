import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '../../../common/dto/paginated.obj.dto';
import { Team } from '../entities/team.entity';

@ObjectType()
export class PaginatedTeams extends Paginated.for(() => Team) {}
