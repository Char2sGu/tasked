import { Component, OnInit, TrackByFunction } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, first, map, switchMap, tap } from 'rxjs/operators';

import { skipFalsy } from '../../../common/rxjs.utils';
import {
  MembershipTaskListGQL,
  MembershipTaskListQuery,
  MembershipTaskListQueryVariables,
} from '../../../graphql';
import { RoomDetailState } from '../room-detail/room-detail-state.service';

export type Task =
  MembershipTaskListQuery['membership']['tasks']['results'][number];

// TODO: make newly added items prepended rather than appended to the list

@Component({
  selector: 'app-room-detail-tasks',
  templateUrl: './room-detail-tasks.component.html',
  styleUrls: ['./room-detail-tasks.component.scss'],
})
export class RoomDetailTasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  loadingInitial = true;
  loadingMore = false;
  loadingMoreNeeded = false;

  private query!: QueryRef<
    MembershipTaskListQuery,
    MembershipTaskListQueryVariables
  >;

  taskTracker: TrackByFunction<Task> = (_, task) => task.id;

  constructor(
    private state: RoomDetailState,
    private listGql: MembershipTaskListGQL,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.state.membership$.pipe(
      skipFalsy(),
      first(),
      tap(({ id }) => (this.query = this.listGql.watch({ id }))),
      switchMap(() => this.query.valueChanges),
      map((result) => result.data.membership.tasks),
      tap(({ results, total }) => {
        this.loadingInitial = false;
        this.loadingMoreNeeded = results.length < total;
      }),
      map(({ results }) => results),
    );
  }

  loadMore(): void {
    if (!this.loadingMoreNeeded || this.loadingMore) return;

    this.loadingMore = true;
    this.tasks$
      .pipe(
        first(),
        tap(console.debug),
        switchMap((current) =>
          from(this.query.fetchMore({ variables: { offset: current.length } })),
        ),
        map((result) => result.data.membership.tasks),
        finalize(() => (this.loadingMore = false)),
      )
      .subscribe(({ results, total }) => {
        this.query.updateQuery((prev) => {
          return {
            ...prev,
            membership: {
              ...prev.membership,
              tasks: {
                ...prev.membership.tasks,
                total,
                results: [...prev.membership.tasks.results, ...results],
              },
            },
          };
        });
      });
  }
}
