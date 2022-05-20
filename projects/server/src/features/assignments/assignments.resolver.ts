import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AssignmentsService } from './assignments.service';
import { CreateAssignmentArgs } from './dto/create-assignment.args.dto';
import { DeleteAssignmentArgs } from './dto/delete-assignment.args.dto';
import { PaginatedAssignments } from './dto/paginated-assignments.obj.dto';
import { QueryAssignmentArgs } from './dto/query-assignment.args.dto';
import { QueryAssignmentsArgs } from './dto/query-assignments.args.dto';
import { UpdateAssignmentArgs } from './dto/update-assignment.args.dto';
import { Assignment } from './entities/assignment.entity';

@Resolver(() => Assignment)
export class AssignmentsResolver {
  constructor(private service: AssignmentsService) {}

  @Query(() => PaginatedAssignments)
  async assignments(
    @Args() args: QueryAssignmentsArgs,
  ): Promise<PaginatedAssignments> {
    return this.service.queryMany(args);
  }

  @Query(() => Assignment)
  async assignment(@Args() args: QueryAssignmentArgs): Promise<Assignment> {
    return this.service.queryOne(args);
  }

  @Mutation(() => Assignment)
  async createAssignment(
    @Args() args: CreateAssignmentArgs,
  ): Promise<Assignment> {
    return this.service.createOne(args);
  }

  @Mutation(() => Assignment)
  async updateAssignment(
    @Args() args: UpdateAssignmentArgs,
  ): Promise<Assignment> {
    return this.service.updateOne(args);
  }

  @Mutation(() => Assignment)
  async deleteAssignment(
    @Args() args: DeleteAssignmentArgs,
  ): Promise<Assignment> {
    return this.service.deleteOne(args);
  }
}
