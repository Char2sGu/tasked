import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthGuardSkipped } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthResult } from './dto/auth-result.obj.dto';
import { QueryTokenArgs } from './dto/query-token.args.dto';

@Resolver()
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Mutation(() => AuthResult)
  @AuthGuardSkipped()
  async auth(
    @Args() { username, password }: QueryTokenArgs,
  ): Promise<AuthResult> {
    return this.service.auth(username, password);
  }
}
