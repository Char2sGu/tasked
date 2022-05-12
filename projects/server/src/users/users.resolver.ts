import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthGuardSkipped } from '../auth/auth.guard';
import { Context } from '../context/context.class';
import {
  CreateUserArgs,
  QueryUserArgs,
  QueryUsersArgs,
  UpdateUserArgs,
} from './dto/user.args';
import { PaginatedUsers } from './dto/user.objects';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private service: UsersService) {}

  @Query(() => PaginatedUsers)
  async users(@Args() args: QueryUsersArgs): Promise<PaginatedUsers> {
    return this.service.queryMany(args);
  }

  @Query(() => User)
  async user(@Args() args: QueryUserArgs): Promise<User> {
    return this.service.queryOne(args);
  }

  @Query(() => User)
  async me(): Promise<User> {
    return Context.current.user;
  }

  @Mutation(() => User)
  @AuthGuardSkipped()
  async createUser(@Args() args: CreateUserArgs): Promise<User> {
    return this.service.createOne(args);
  }

  @Mutation(() => User)
  async updateUser(@Args() args: UpdateUserArgs): Promise<User> {
    return this.service.updateOne(args);
  }
}
