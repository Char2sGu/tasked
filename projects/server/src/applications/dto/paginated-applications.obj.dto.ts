import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '../../common/dto/paginated.obj.dto';
import { Application } from '../entities/application.entity';

@ObjectType()
export class PaginatedApplications extends Paginated.for(() => Application) {}
