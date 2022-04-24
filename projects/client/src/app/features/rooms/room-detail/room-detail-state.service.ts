import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, concatMap, filter, map, of, switchMap } from 'rxjs';

import { RoomDetailGQL, RoomDetailQuery } from '../../../graphql';

export type Room = RoomDetailQuery['room'];
export type Membership = NonNullable<Room['membership']>;

@Injectable()
export class RoomDetailState {
  room$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((v): v is string => typeof v == 'string'),
    switchMap((id) => this.roomDetailGql.watch({ id }).valueChanges),
    map((result) => result.data.room),
    catchError(() => {
      this.router.navigate(['/app/rooms']);
      return of();
    }),
  );
  membership$ = this.room$.pipe(
    map((room) => room.membership),
    concatMap((v) => {
      if (v) return of(v);
      this.router.navigate(['/app/rooms']);
      return of();
    }),
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomDetailGql: RoomDetailGQL,
  ) {}
}
