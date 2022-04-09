import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthGuardSkip } from './auth-guard-skip.decorator';
import { AuthResult } from './dto/auth-result.obj.dto';
import { QueryTokenArgs } from './dto/query-token.args.dto';

@Resolver()
export class AuthResolver {
  constructor(private service: AuthService) {}

  @AuthGuardSkip()
  @Mutation(() => AuthResult)
  async auth(
    @Args() { username, password }: QueryTokenArgs,
  ): Promise<AuthResult> {
    const result = await this.service.obtainJwt(username, password);
    if (!result)
      throw new UnauthorizedException('Invalid username or password');
    return result;
  }
}
