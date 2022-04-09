import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { RoomListGQL, RoomListQuery } from '../../../graphql';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  rooms$!: Observable<Room[]>;
  searchValue = '';
  loading = false;

  constructor(private listGql: RoomListGQL) {}

  ngOnInit(): void {
    this.rooms$ = this.list();
  }

  load(): void {
    if (this.loading) return;
    this.loading = true;

    this.rooms$ = (this.searchValue ? this.search() : this.list()).pipe(
      finalize(() => (this.loading = false)),
    );
    if (!this.searchValue) this.list();
    else this.search();
  }

  private list() {
    return this.listGql
      .fetch({ joinedOnly: true })
      .pipe(map((result) => result.data.rooms.results));
  }

  private search() {
    const searchId = /^#(\d+)$/.exec(this.searchValue)?.[1];
    return this.listGql
      .fetch(
        {
          filter:
            searchId != undefined
              ? { id: searchId }
              : { name__like: `%${this.searchValue}%` },
        },
        { fetchPolicy: 'network-only' },
      )
      .pipe(map((result) => result.data.rooms.results));
  }
}

type Room = RoomListQuery['rooms']['results'][number];
