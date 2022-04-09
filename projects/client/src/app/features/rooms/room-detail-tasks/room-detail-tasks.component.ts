import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import {
  MembershipTaskListGQL,
  MembershipTaskListQuery,
  MembershipTaskListQueryVariables,
  RoomDetailGQL,
} from '../../../graphql';

type Task = MembershipTaskListQuery['membership']['tasks']['results'][number];

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

  constructor(
    private route: ActivatedRoute,
    private roomGql: RoomDetailGQL,
    private listGql: MembershipTaskListGQL,
  ) {}

  ngOnInit(): void {
    const classroomId = this.route.parent!.snapshot.paramMap.get('id')!;

    const membershipId = this.roomGql
      .watch({ id: classroomId })
      .getCurrentResult().data.room.membership!.id;

    this.query = this.listGql.watch({ id: membershipId });
    this.tasks$ = this.query.valueChanges.pipe(
      map((result) => result.data.membership.tasks),
      tap(({ results, total }) => {
        this.loadingInitial = false;
        this.loadingMoreNeeded = results.length < total;
      }),
      map(({ results }) => results),
    );
  }

  identifyTask(index: number, task: Task): string {
    return task.id;
  }

  fetchMore(): void {
    if (!this.loadingMoreNeeded || this.loadingMore) return;

    const current = this.query.getCurrentResult().data.membership.tasks;
    this.loadingMore = true;
    from(
      this.query.fetchMore({ variables: { offset: current.results.length } }),
    )
      .pipe(
        map((result) => result.data.membership.tasks),
        finalize(() => (this.loadingMore = false)),
      )
      .subscribe(({ results, total }) => {
        this.query.updateQuery((prev) => ({
          ...prev,
          membership: {
            ...prev.membership,
            tasks: {
              ...prev.membership.tasks,
              total,
              results: [...prev.membership.tasks.results, ...results],
            },
          },
        }));
      });
  }
}
