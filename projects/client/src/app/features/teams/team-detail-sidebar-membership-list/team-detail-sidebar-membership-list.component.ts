import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  Role,
  RoomDetailGQL,
  RoomMembershipListGQL,
  RoomMembershipListQuery,
} from '../../../graphql';
import { AuthService } from '../../auth/auth.service';

type Membership =
  RoomMembershipListQuery['room']['memberships']['results'][number];

@Component({
  selector: 'app-team-detail-sidebar-membership-list',
  templateUrl: './team-detail-sidebar-membership-list.component.html',
  styleUrls: ['./team-detail-sidebar-membership-list.component.scss'],
})
export class TeamDetailSidebarMembershipListComponent implements OnInit {
  memberships$!: Observable<Membership[]>;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private listGql: RoomMembershipListGQL,
    private teamGql: RoomDetailGQL,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.loading = true;

      this.memberships$ = combineLatest([
        this.listGql
          .watch({ id })
          .valueChanges.pipe(
            map((result) => [...result.data.room.memberships.results]),
          ),
        this.teamGql
          .watch({ id })
          .valueChanges.pipe(map((result) => result.data.room)),
        this.auth.user$,
      ]).pipe(
        tap(() => (this.loading = false)),
        map(([memberships, team, user]) =>
          memberships
            .sort((a, b) =>
              a.owner.id == user!.id ? -1 : b.owner.id == user!.id ? 1 : 0,
            )
            .sort((a, b) =>
              a.owner.id == team.creator.id
                ? -1
                : b.owner.id == team.creator.id
                ? 1
                : a.role == b.role
                ? 0
                : a.role == Role.Manager
                ? -1
                : 1,
            ),
        ),
      );
    });
  }
}
