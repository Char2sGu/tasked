import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import {
  MembershipAssignmentListGQL,
  MembershipAssignmentListQuery,
  MembershipAssignmentListQueryVariables,
  RoomDetailGQL,
} from '../../../graphql';

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
  loadingInitial = true;
  loadingMore = false;
  loadingMoreNeeded = false;

  private query!: QueryRef<
    MembershipAssignmentListQuery,
    MembershipAssignmentListQueryVariables
  >;

  constructor(
    private route: ActivatedRoute,
    private roomGql: RoomDetailGQL,
    private listGql: MembershipAssignmentListGQL,
  ) {}

  ngOnInit(): void {
    const classroomId = this.route.parent!.snapshot.paramMap.get('id')!;

    const membershipId = this.roomGql
      .watch({ id: classroomId })
      .getCurrentResult().data.room.membership!.id;

    this.query = this.listGql.watch({ id: membershipId });

    const assignments$ = this.query.valueChanges.pipe(
      map((result) => result.data.membership.assignments),
      tap(({ results, total }) => {
        this.loadingInitial = false;
        this.loadingMoreNeeded = results.length < total;
      }),
      map(({ results }) =>
        [...results]
          .sort(
            (a, b) =>
              -(
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime()
              ),
          )
          .sort((a, b) =>
            a.isImportant == b.isImportant ? 0 : a.isImportant ? -1 : 1,
          ),
      ),
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
}
