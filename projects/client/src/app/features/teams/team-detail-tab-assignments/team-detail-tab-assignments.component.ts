import { Component, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import {
  concatMap,
  finalize,
  first,
  from,
  map,
  Observable,
  shareReplay,
  tap,
} from 'rxjs';

import { FlipScopeDirective } from '../../../components/flip/flip-scope.directive';
import {
  MembershipAssignmentListGQL,
  MembershipAssignmentListQuery,
  MembershipAssignmentListQueryVariables,
} from '../../../graphql/codegen';
import { TeamDetailState } from '../team-detail/team-detail-state.service';

type Assignment =
  MembershipAssignmentListQuery['membership']['assignments']['results'][number];

@Component({
  selector: 'app-team-detail-tab-assignments',
  templateUrl: './team-detail-tab-assignments.component.html',
  styleUrls: ['./team-detail-tab-assignments.component.scss'],
})
export class TeamDetailTabAssignmentsComponent implements OnInit {
  assignmentsPending$!: Observable<Assignment[]>;
  assignmentsCompleted$!: Observable<Assignment[]>;
  loadingMore = false;
  loadingMoreNeeded = false;
  flipRequired = false;
  assignmentTracker: TrackByFunction<Assignment> = (_, item) => item.id;

  private query!: QueryRef<
    MembershipAssignmentListQuery,
    MembershipAssignmentListQueryVariables
  >;

  @ViewChild(FlipScopeDirective) private flipScope?: FlipScopeDirective;

  constructor(
    private state: TeamDetailState,
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
      tap(() => {
        this.flipScope?.save();
        this.flipRequired = true;
      }),
      shareReplay(1),
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
