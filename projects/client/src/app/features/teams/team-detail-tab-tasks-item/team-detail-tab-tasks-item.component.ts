import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Notifier } from '../../../core/notifier.service';
import {
  MembershipTaskListGQL,
  RoomDetailGQL,
  TaskDeleteGQL,
  TaskUpdateInput,
} from '../../../graphql';
import { Task } from '../team-detail-tab-tasks/team-detail-tab-tasks.component';

@Component({
  selector: 'app-team-detail-tab-tasks-item',
  templateUrl: './team-detail-tab-tasks-item.component.html',
  styleUrls: ['./team-detail-tab-tasks-item.component.scss'],
})
export class TeamDetailTabTasksItemComponent implements OnInit, OnDestroy {
  data: TaskUpdateInput = {};
  loading = false;

  @Input() task?: Task;

  constructor(
    private route: ActivatedRoute,
    private notifier: Notifier,
    private listGql: MembershipTaskListGQL,
    private deleteGql: TaskDeleteGQL,
    private teamDetailGql: RoomDetailGQL,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  delete(): void {
    if (!this.task) return;
    this.mutate(
      this.deleteGql.mutate(
        { id: this.task.id },
        {
          update: (cache, result) => {
            cache.evict({ id: cache.identify(result.data!.deleteTask) });

            const teamId = this.route.parent!.snapshot.paramMap.get('id')!;
            const membershipId = this.teamDetailGql
              .watch({ id: teamId })
              .getCurrentResult().data.room.membership!.id;

            this.listGql.watch({ id: membershipId }).updateQuery((prev) => ({
              ...prev,
              membership: {
                ...prev.membership,
                tasks: {
                  ...prev.membership.tasks,
                  total: prev.membership.tasks.total - 1,
                },
              },
            }));
          },
        },
      ),
      $localize`Task deleted`,
      $localize`Failed to delete the task`,
    );
  }

  private mutate(
    mutation: Observable<unknown>,
    messageOnSucceed: string,
    messageOnFail: string,
  ) {
    if (this.loading) return;
    this.loading = true;
    mutation.pipe(finalize(() => (this.loading = false))).subscribe({
      next: () => this.notifier.success(messageOnSucceed),
      error: () => this.notifier.error(messageOnFail),
    });
  }
}
