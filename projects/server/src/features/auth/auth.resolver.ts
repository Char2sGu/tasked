import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserCreateInput } from '../users/dto/user.inputs';
import { AuthGuardSkipped } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthResult, LoginResult, RegisterResult } from './dto/auth.objects';

@Resolver()
@AuthGuardSkipped()
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Mutation(() => LoginResult)
  @Mutation(() => AuthResult, {
    name: 'auth',
    deprecationReason: 'Use `login` instead',
  })
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<LoginResult> {
    return this.service.login(username, password);
  }

  @Mutation(() => RegisterResult)
  async register(@Args('data') data: UserCreateInput): Promise<RegisterResult> {
    return this.service.register(data);
  }
}
