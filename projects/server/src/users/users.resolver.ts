import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthGuardSkip } from '../auth/auth-guard-skip.decorator';
import { Context } from '../context/context.class';
import { CreateUserArgs } from './dto/create-user.args.dto';
import { PaginatedUsers } from './dto/paginated-users.obj.dto';
import { QueryUserArgs } from './dto/query-user.args.dto';
import { QueryUsersArgs } from './dto/query-users.args.dto';
import { UpdateUserArgs } from './dto/update-user.args.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private service: UsersService) {}

  @Query(() => PaginatedUsers)
  async users(@Args() args: QueryUsersArgs) {
    return this.service.queryMany(args);
  }

  @Query(() => User)
  async user(@Args() args: QueryUserArgs) {
    return this.service.queryOne(args);
  }

  @Query(() => User)
  async me() {
    return Context.current.user;
  }

  @AuthGuardSkip()
  @Mutation(() => User)
  async createUser(@Args() args: CreateUserArgs) {
    return this.service.createOne(args);
  }

  @Mutation(() => User)
  async updateUser(@Args() args: UpdateUserArgs) {
    return this.service.updateOne(args);
  }
}
