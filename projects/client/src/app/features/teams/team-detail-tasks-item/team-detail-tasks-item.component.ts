import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import {
  MembershipTaskListGQL,
  RoomDetailGQL,
  TaskDeleteGQL,
  TaskUpdateInput,
} from '../../../graphql';
import { Task } from '../team-detail-tasks/team-detail-tasks.component';

@Component({
  selector: 'app-team-detail-tasks-item',
  templateUrl: './team-detail-tasks-item.component.html',
  styleUrls: ['./team-detail-tasks-item.component.scss'],
})
export class TeamDetailTasksItemComponent implements OnInit, OnDestroy {
  data: TaskUpdateInput = {};
  loading = false;

  @Input() task?: Task;

  constructor(
    private route: ActivatedRoute,
    private notifier: NotifierService,
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
    mutation.pipe(finalize(() => (this.loading = false))).subscribe(
      () => this.notifier.notify(NotificationType.Success, messageOnSucceed),
      () => this.notifier.notify(NotificationType.Error, messageOnFail),
    );
  }
}
