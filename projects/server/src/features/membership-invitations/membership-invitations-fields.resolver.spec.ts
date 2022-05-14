import { Test, TestingModule } from '@nestjs/testing';

import { MembershipInvitationsFieldsResolver } from './membership-invitations-fields.resolver';

describe('MembershipInvitationsFieldsResolver', () => {
  let resolver: MembershipInvitationsFieldsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipInvitationsFieldsResolver],
    }).compile();

    resolver = module.get<MembershipInvitationsFieldsResolver>(
      MembershipInvitationsFieldsResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
