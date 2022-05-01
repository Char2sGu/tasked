import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { RoomListGQL, RoomListQuery } from '../../../graphql/codegen';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  teams$!: Observable<Team[]>;
  teamTracker: TrackByFunction<Team> = (_, item) => item.id;
  searchInput = '';
  searchMode = false;
  loading = false;

  constructor(private listGql: RoomListGQL) {}

  ngOnInit(): void {
    this.teams$ = this.list();
  }

  load(): void {
    if (this.loading) return;
    this.loading = true;

    this.teams$ = (this.searchInput ? this.search() : this.list()).pipe(
      finalize(() => (this.loading = false)),
    );
    if (!this.searchInput) this.list();
    else this.search();
  }

  private list() {
    this.searchMode = false;
    return this.listGql
      .fetch({ joinedOnly: true })
      .pipe(map((result) => result.data.rooms.results));
  }

  private search() {
    this.searchMode = true;
    const searchId = /^#(\d+)$/.exec(this.searchInput)?.[1];
    return this.listGql
      .fetch(
        {
          filter:
            searchId != undefined
              ? { id: searchId }
              : { name__like: `%${this.searchInput}%` },
        },
        { fetchPolicy: 'network-only' },
      )
      .pipe(map((result) => result.data.rooms.results));
  }
}

type Team = RoomListQuery['rooms']['results'][number];
