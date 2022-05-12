import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthGuardSkipped } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginArgs, QueryTokenArgs, RegisterArgs } from './dto/auth.args';
import { AuthResult, LoginResult, RegisterResult } from './dto/auth.objects';

@Resolver()
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Mutation(() => LoginResult)
  @AuthGuardSkipped()
  async login(@Args() args: LoginArgs): Promise<LoginResult> {
    return this.service.login(args);
  }

  @Mutation(() => RegisterResult)
  @AuthGuardSkipped()
  async register(@Args() args: RegisterArgs): Promise<RegisterResult> {
    return this.service.register(args);
  }

  /**@deprecated */
  @Mutation(() => AuthResult, { deprecationReason: 'Use `login` instead' })
  @AuthGuardSkipped()
  async auth(@Args() args: QueryTokenArgs): Promise<AuthResult> {
    return this.service.login(args);
  }
}
