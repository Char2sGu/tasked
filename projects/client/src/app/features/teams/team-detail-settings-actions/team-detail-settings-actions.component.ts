import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { concatMap, finalize, first, map } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import {
  MembershipDeleteGQL,
  RoomDeleteGQL,
  RoomDetailGQL,
  RoomDetailQuery,
} from '../../../graphql';

type Team = RoomDetailQuery['room'];

@Component({
  selector: 'app-team-detail-settings-actions',
  templateUrl: './team-detail-settings-actions.component.html',
  styleUrls: ['./team-detail-settings-actions.component.scss'],
})
export class TeamDetailSettingsActionsComponent implements OnInit {
  @Input() admin = false;
  loading = false;

  private team$!: Observable<Team>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifierService,
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
      $localize`Exited the team`,
      $localize`Failed to exit the team`,
    );
  }

  disband(): void {
    this.mutate(
      (team) => this.teamDeleteGql.mutate({ id: team.id }),
      $localize`Disbanded the team`,
      $localize`Failed to disband the team`,
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
      .subscribe(
        ([, team]) => {
          this.notifier.notify(NotificationType.Success, messageOnSucceed);
          this.router.navigate(['/app/teams']);
          const cache = this.apollo.client.cache;
          cache.evict({ id: cache.identify(team) });
        },
        () => {
          this.notifier.notify(NotificationType.Error, messageOnFail);
        },
      );
  }
}
