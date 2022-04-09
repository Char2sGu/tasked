import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RoomListGQL, RoomListQuery } from '../../../graphql';

type Room = RoomListQuery['rooms']['results'][number];

@Component({
  selector: 'app-main-layout-sidenav-rooms',
  templateUrl: './main-layout-sidenav-rooms.component.html',
  styleUrls: ['./main-layout-sidenav-rooms.component.scss'],
})
export class MainLayoutSidenavRoomsComponent implements OnInit {
  rooms$!: Observable<Room[]>;
  loading = true;

  constructor(private router: Router, private roomListGql: RoomListGQL) {}

  identifyRoom: TrackByFunction<Room> = (_, { id }) => id;

  ngOnInit(): void {
    this.rooms$ = this.roomListGql
      .watch({ joinedOnly: true })
      .valueChanges.pipe(
        tap(() => (this.loading = false)),
        map(({ data }) => data.rooms.results),
      );
  }

  deactivateIfActivated(path: string): void {
    if (this.isRouteActivated(path)) this.router.navigate(['/app/rooms']);
  }

  private isRouteActivated(path: string) {
    const tree = this.router.createUrlTree(['/app/rooms', path]);
    const isActive = this.router.isActive(tree, {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
    return isActive;
  }
}
