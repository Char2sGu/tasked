import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { concatMap, finalize, first, map } from 'rxjs/operators';

import { Notifier } from '../../../core/notifier.service';
import {
  MembershipDeleteGQL,
  RoomDeleteGQL,
  RoomDetailGQL,
  RoomDetailQuery,
} from '../../../graphql';

type Team = RoomDetailQuery['room'];

@Component({
  selector: 'app-team-detail-tab-settings-actions',
  templateUrl: './team-detail-tab-settings-actions.component.html',
  styleUrls: ['./team-detail-tab-settings-actions.component.scss'],
})
export class TeamDetailTabSettingsActionsComponent implements OnInit {
  @Input() admin = false;
  loading = false;

  private team$!: Observable<Team>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifier: Notifier,
    private apollo: Apollo,
    private teamGql: RoomDetailGQL,
    private membershipDeleteGql: MembershipDeleteGQL,
    private teamDeleteGql: RoomDeleteGQL,
  ) {}

  ngOnInit(): void {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    this.team$ = this.teamGql
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.room));
  }

  exit(): void {
    this.mutate(
      (team) => this.membershipDeleteGql.mutate({ id: team.membership!.id }),
      $localize`Exited`,
      $localize`Failed to exit`,
    );
  }

  disband(): void {
    this.mutate(
      (team) => this.teamDeleteGql.mutate({ id: team.id }),
      $localize`Team disbanded`,
      $localize`Failed to disband`,
    );
  }

  private mutate<T>(
    mutation: (team: Team) => Observable<T>,
    messageOnSucceed: string,
    messageOnFail: string,
  ) {
    if (this.loading) return;
    this.loading = true;
    this.team$
      .pipe(
        concatMap((team) =>
          mutation(team).pipe(map((result) => [result, team] as const)),
        ),
        first(),

        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: ([, team]) => {
          this.notifier.success(messageOnSucceed);
          this.router.navigate(['/app/teams']);
          const cache = this.apollo.client.cache;
          cache.evict({ id: cache.identify(team) });
        },
        error: () => {
          this.notifier.error(messageOnFail);
        },
      });
  }
}
