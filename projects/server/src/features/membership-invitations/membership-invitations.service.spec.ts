import { Test, TestingModule } from '@nestjs/testing';

import { MembershipInvitationsService } from './membership-invitations.service';

describe('MembershipInvitationsService', () => {
  let service: MembershipInvitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipInvitationsService],
    }).compile();

    service = module.get<MembershipInvitationsService>(
      MembershipInvitationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
