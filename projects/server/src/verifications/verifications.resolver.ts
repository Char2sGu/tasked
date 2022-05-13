import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ReqUser } from '../common/req-user.decorator';
import { User } from '../users/entities/user.entity';
import {
  ConfirmVerificationArgs,
  RequestVerificationArgs,
} from './dto/verification.args';
import { Verification } from './entities/verification.entity';
import { VerificationsService } from './verifications.service';

@Resolver()
export class VerificationsResolver {
  constructor(private service: VerificationsService) {}

  @Mutation(() => Verification)
  async requestVerification(
    @Args() args: RequestVerificationArgs,
    @ReqUser() user: User,
  ): Promise<Verification> {
    return this.service.request(args, user);
  }

  @Mutation(() => Verification)
  async confirmVerification(
    @Args() args: ConfirmVerificationArgs,
    @ReqUser() user: User,
  ): Promise<Verification> {
    return this.service.confirm(args, user);
  }
}
