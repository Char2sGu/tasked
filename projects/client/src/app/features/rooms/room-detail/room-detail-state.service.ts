import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

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
  );
  membership$ = this.room$.pipe(map((room) => room.membership));

  constructor(
    private route: ActivatedRoute,
    private roomDetailGql: RoomDetailGQL,
  ) {}
}
