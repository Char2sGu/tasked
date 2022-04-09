import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import {
  MembershipTaskListGQL,
  RoomDetailGQL,
  TaskCreateGQL,
} from '../../../graphql';

@Component({
  selector: 'app-room-detail-tasks-creation-bar',
  templateUrl: './room-detail-tasks-creation-bar.component.html',
  styleUrls: ['./room-detail-tasks-creation-bar.component.scss'],
})
export class RoomDetailTasksCreationBarComponent implements OnInit {
  data = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private listGql: MembershipTaskListGQL,
    private createGql: TaskCreateGQL,
    private roomDetailGql: RoomDetailGQL,
  ) {}

  ngOnInit(): void {}

  create(): void {
    if (this.loading) return;

    const roomId = this.route.parent!.snapshot.paramMap.get('id')!;
    const membershipId = this.roomDetailGql
      .watch({ id: roomId })
      .getCurrentResult().data.room.membership!.id;

    this.loading = true;
    this.createGql
      .mutate(
        { data: { room: roomId, title: this.data } },
        {
          update: (_, result) => {
            const query = this.listGql.watch({ id: membershipId });
            query.updateQuery((prev) => ({
              ...prev,
              membership: {
                ...prev.membership,
                tasks: {
                  ...prev.membership.tasks,
                  total: prev.membership.tasks.total + 1,
                  results: [
                    result.data!.createTask,
                    ...prev.membership.tasks.results,
                  ],
                },
              },
            }));
          },
        },
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.notifier.notify(
            NotificationType.Success,
            $localize`Task created`,
          );
          this.data = '';
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Failed to create the task`,
          );
        },
      );
  }
}
