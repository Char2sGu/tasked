import { Test, TestingModule } from '@nestjs/testing';

import { MembershipInvitationsResolver } from './membership-invitations.resolver';
import { MembershipInvitationsService } from './membership-invitations.service';

describe('MembershipInvitationsResolver', () => {
  let resolver: MembershipInvitationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipInvitationsResolver, MembershipInvitationsService],
    }).compile();

    resolver = module.get<MembershipInvitationsResolver>(
      MembershipInvitationsResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
