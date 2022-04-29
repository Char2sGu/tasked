import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AuthService } from '../../../core/auth.service';
import { Notifier } from '../../../core/notifier.service';
import {
  MembershipDeleteGQL,
  MembershipUpdateGQL,
  Role,
  RoomDetailGQL,
  RoomMembershipListGQL,
  RoomMembershipListQuery,
} from '../../../graphql';

type Membership =
  RoomMembershipListQuery['room']['memberships']['results'][number];

@Component({
  selector: 'app-team-detail-tabs-sidebar-membership-list-item-menu',
  templateUrl:
    './team-detail-tabs-sidebar-membership-list-item-menu.component.html',
  styleUrls: [
    './team-detail-tabs-sidebar-membership-list-item-menu.component.scss',
  ],
})
export class TeamDetailSidebarMembershipListItemMenuComponent
  implements OnInit, OnDestroy
{
  @Input() membership?: Membership;
  loading = false;
  canPromote?: boolean;
  canDemote?: boolean;
  canRemove?: boolean;

  private teamId!: string;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifier: Notifier,
    private teamGql: RoomDetailGQL,
    private listGql: RoomMembershipListGQL,
    private updateGql: MembershipUpdateGQL,
    private deleteGql: MembershipDeleteGQL,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (!this.membership) return;

      this.teamId = params.get('id')!;

      this.subscription?.unsubscribe();
      this.subscription = combineLatest([
        this.teamGql
          .watch({ id: this.teamId })
          .valueChanges.pipe(map((result) => result.data.room)),
        this.auth.user$,
      ]).subscribe(([team, user]) => {
        const isSelf = this.membership?.owner.id == user?.id;
        if (team.creator.id == user?.id) {
          this.canPromote = this.membership?.role == Role.Member;
          this.canDemote = this.membership?.role == Role.Manager && !isSelf;
          this.canRemove = !isSelf;
        } else {
          if (team.membership!.role == Role.Member) {
            this.canPromote = false;
            this.canDemote = false;
            this.canRemove = false;
          } else {
            this.canPromote = this.membership?.role == Role.Member;
            this.canDemote = false;
            this.canRemove = this.membership?.role == Role.Member && !isSelf;
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  promote(): void {
    this.mutate(
      (membership) =>
        this.updateGql.mutate({
          id: membership.id,
          data: { role: Role.Manager },
        }),
      $localize`Member promoted successfully`,
      $localize`Failed to promote the member`,
    );
  }

  demote(): void {
    this.mutate(
      (membership) =>
        this.updateGql.mutate({
          id: membership.id,
          data: { role: Role.Member },
        }),
      $localize`Member demoted successfully`,
      $localize`Failed to demote the member`,
    );
  }

  remove(): void {
    this.mutate(
      (membership) =>
        this.deleteGql.mutate(
          { id: membership.id },
          {
            update: (cache) => {
              cache.evict({ id: cache.identify(membership) });
              const query = this.listGql.watch({ id: this.teamId });
              query.updateQuery((prev) => ({
                ...prev,
                room: {
                  ...prev.room,
                  memberships: {
                    ...prev.room.memberships,
                    total: prev.room.memberships.total - 1,
                  },
                },
              }));
            },
          },
        ),
      $localize`Member removed successfully`,
      $localize`Failed to remove the member`,
    );
  }

  private mutate(
    mutation: (membership: Membership) => Observable<unknown>,
    messageSuccess: string,
    messageFail: string,
  ) {
    if (this.loading) return;
    if (this.membership)
      mutation(this.membership)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: () => {
            this.notifier.success(messageSuccess);
          },
          error: () => {
            this.notifier.error(messageFail);
          },
        });
  }
}
