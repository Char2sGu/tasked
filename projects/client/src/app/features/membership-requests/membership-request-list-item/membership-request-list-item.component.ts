import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Notifier } from '../../../core/notifier.service';
import {
  MembershipRequestAcceptGQL,
  MembershipRequestDeleteGQL,
  MembershipRequestListGQL,
  MembershipRequestListQuery,
  MembershipRequestRejectGQL,
  MembershipRequestStatus,
  TeamMembershipListGQL,
} from '../../../graphql/codegen';

type MembershipRequest =
  MembershipRequestListQuery['membershipRequests']['results'][number];

@Component({
  selector: 'app-membership-request-list-item',
  templateUrl: './membership-request-list-item.component.html',
  styleUrls: ['./membership-request-list-item.component.scss'],
})
export class MembershipRequestListItemComponent implements OnInit {
  @Input() membershipRequest?: MembershipRequest;
  @Input() own = false;
  loading = false;
  MembershipRequestStatus = MembershipRequestStatus;
  membershipRequestStatusText = {
    [MembershipRequestStatus.Accepted]: $localize`Accepted`,
    [MembershipRequestStatus.Pending]: $localize`Pending`,
    [MembershipRequestStatus.Rejected]: $localize`Rejected`,
  };

  constructor(
    private notifier: Notifier,
    private listGql: MembershipRequestListGQL,
    private acceptGql: MembershipRequestAcceptGQL,
    private rejectGql: MembershipRequestRejectGQL,
    private deleteGql: MembershipRequestDeleteGQL,
    private teamMembershipListGql: TeamMembershipListGQL,
  ) {}

  ngOnInit(): void {}

  accept(): void {
    if (!this.membershipRequest) return;
    const membershipRequest = this.membershipRequest;

    this.mutate(
      this.acceptGql.mutate(
        { id: membershipRequest.id },
        {
          update: (_, result) => {
            const query = this.teamMembershipListGql.watch({
              id: membershipRequest.team.id,
            });
            if (query.getCurrentResult().loading) return;
            query.updateQuery((prev) => ({
              ...prev,
              team: {
                ...prev.team,
                memberships: {
                  ...prev.team.memberships,
                  total: prev.team.memberships.total + 1,
                  results: [
                    ...prev.team.memberships.results,
                    result.data!.acceptMembershipRequest.membership,
                  ],
                },
              },
            }));
          },
        },
      ),
      $localize`MembershipRequest accepted`,
      $localize`Failed to accept the membershipRequest`,
    );
  }

  reject(): void {
    if (!this.membershipRequest) return;
    this.mutate(
      this.rejectGql.mutate({ id: this.membershipRequest.id }),
      $localize`MembershipRequest rejected`,
      $localize`Failed to reject the membershipRequest`,
    );
  }

  delete(): void {
    if (!this.membershipRequest) return;
    this.mutate(
      this.deleteGql.mutate(
        { id: this.membershipRequest.id },
        {
          update: (cache, result) => {
            cache.evict({
              id: cache.identify(result.data!.deleteMembershipRequest),
            });
            const query = this.listGql.watch();
            query.updateQuery((prev) => ({
              ...prev,
              membershipRequests: {
                ...prev.membershipRequests,
                total: prev.membershipRequests.total - 1,
              },
            }));
          },
        },
      ),
      $localize`MembershipRequest deleted`,
      $localize`Failed to delete the membershipRequest`,
    );
  }

  private mutate<T>(
    mutation: Observable<T>,
    messageOnSuccess: string,
    messageOnFailure: string,
  ) {
    if (this.loading) return;
    this.loading = true;
    mutation.pipe(finalize(() => (this.loading = false))).subscribe(
      () => this.notifier.success(messageOnSuccess),
      () => this.notifier.error(messageOnFailure),
    );
  }
}
