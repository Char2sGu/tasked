import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, concatMap, filter, map, of, switchMap } from 'rxjs';

import { RoomDetailGQL, RoomDetailQuery } from '../../../graphql/codegen';

export type Team = RoomDetailQuery['room'];
export type Membership = NonNullable<Team['membership']>;

@Injectable()
export class TeamDetailState {
  team$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((v): v is string => typeof v == 'string'),
    switchMap((id) => this.teamDetailGql.watch({ id }).valueChanges),
    map((result) => result.data.room),
    catchError(() => {
      this.router.navigate(['/app/teams']);
      return of();
    }),
  );
  membership$ = this.team$.pipe(
    map((team) => team.membership),
    concatMap((v) => {
      if (v) return of(v);
      this.router.navigate(['/app/teams']);
      return of();
    }),
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamDetailGql: RoomDetailGQL,
  ) {}
}
