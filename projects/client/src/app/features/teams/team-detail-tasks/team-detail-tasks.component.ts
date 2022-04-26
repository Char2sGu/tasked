import { Component, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { NgxMasonryComponent } from 'ngx-masonry';
import { from, Observable } from 'rxjs';
import { finalize, first, map, switchMap, tap } from 'rxjs/operators';

import { skipFalsy } from '../../../common/rxjs';
import {
  MembershipTaskListGQL,
  MembershipTaskListQuery,
  MembershipTaskListQueryVariables,
} from '../../../graphql';
import { TeamDetailState } from '../team-detail/team-detail-state.service';

export type Task =
  MembershipTaskListQuery['membership']['tasks']['results'][number];

// TODO: animation on item removal
// TODO: truncate long task descriptions
// TODO: show a skeleton while loading

@Component({
  selector: 'app-team-detail-tasks',
  templateUrl: './team-detail-tasks.component.html',
  styleUrls: ['./team-detail-tasks.component.scss'],
})
export class TeamDetailTasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  loadingInitial = true;
  loadingMore = false;
  loadingMoreNeeded = false;

  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  private query!: QueryRef<
    MembershipTaskListQuery,
    MembershipTaskListQueryVariables
  >;

  taskTracker: TrackByFunction<Task> = (_, task) => task.id;

  constructor(
    private state: TeamDetailState,
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
      tap(() => setTimeout(() => this.masonry?.reloadItems())),
    );
  }

  loadMore(): void {
    if (!this.loadingMoreNeeded || this.loadingMore) return;

    this.loadingMore = true;
    this.tasks$
      .pipe(
        first(),
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
