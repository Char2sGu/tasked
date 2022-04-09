import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '../../common/dto/paginated.obj.dto';
import { Assignment } from '../entities/assignment.entity';

@ObjectType()
export class PaginatedAssignments extends Paginated.for(() => Assignment) {}
