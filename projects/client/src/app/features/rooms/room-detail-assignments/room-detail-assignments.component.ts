import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { concatMap, finalize, first, from, map, Observable, tap } from 'rxjs';

import {
  MembershipAssignmentListGQL,
  MembershipAssignmentListQuery,
  MembershipAssignmentListQueryVariables,
} from '../../../graphql';
import { RoomDetailState } from '../room-detail/room-detail-state.service';

type Assignment =
  MembershipAssignmentListQuery['membership']['assignments']['results'][number];

@Component({
  selector: 'app-room-detail-assignments',
  templateUrl: './room-detail-assignments.component.html',
  styleUrls: ['./room-detail-assignments.component.scss'],
})
export class RoomDetailAssignmentsComponent implements OnInit {
  assignmentsPending$!: Observable<Assignment[]>;
  assignmentsCompleted$!: Observable<Assignment[]>;
  loadingMore = false;
  loadingMoreNeeded = false;

  private query!: QueryRef<
    MembershipAssignmentListQuery,
    MembershipAssignmentListQueryVariables
  >;

  constructor(
    private state: RoomDetailState,
    private listGql: MembershipAssignmentListGQL,
  ) {}

  ngOnInit(): void {
    const queryResult$ = this.state.membership$.pipe(
      first(),
      map((membership) => this.listGql.watch({ id: membership.id })),
      tap((query) => (this.query = query)),
      concatMap((query) => query.valueChanges),
    );
    const assignments$ = queryResult$.pipe(
      map((result) => result.data.membership.assignments),
      tap(({ results, total }) => {
        this.loadingMoreNeeded = results.length < total;
      }),
      map(({ results }) => this.sort(results)),
    );
    this.assignmentsPending$ = assignments$.pipe(
      map((items) => items.filter((item) => !item.isCompleted)),
    );
    this.assignmentsCompleted$ = assignments$.pipe(
      map((items) => items.filter((item) => item.isCompleted)),
    );
  }

  fetchMore(): void {
    if (!this.loadingMoreNeeded || this.loadingMore) return;

    const data = this.query.getCurrentResult().data.membership.assignments;

    this.loadingMore = true;
    from(this.query.fetchMore({ variables: { offset: data.results.length } }))
      .pipe(
        map((result) => result.data.membership.assignments),
        finalize(() => (this.loadingMore = false)),
      )
      .subscribe(({ results, total }) => {
        this.query.updateQuery((prev) => ({
          ...prev,
          membership: {
            ...prev.membership,
            assignments: {
              ...prev.membership.assignments,
              total,
              results: [...prev.membership.assignments.results, ...results],
            },
          },
        }));
      });
  }

  private sort(data: Assignment[]) {
    return [...data]
      .sort(
        (a, b) =>
          -(new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()),
      )
      .sort((a, b) =>
        a.isImportant == b.isImportant ? 0 : a.isImportant ? -1 : 1,
      );
  }
}
