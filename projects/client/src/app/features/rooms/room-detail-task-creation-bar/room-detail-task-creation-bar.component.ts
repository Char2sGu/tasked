import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { combineLatest, concatMap, first } from 'rxjs';

import { NotificationType } from '../../../common/notification-type.enum';
import { skipFalsy } from '../../../common/rxjs.utils';
import { MembershipTaskListGQL, TaskCreateGQL } from '../../../graphql';
import { RoomDetailState } from '../room-detail/room-detail-state.service';

@Component({
  selector: 'app-room-detail-task-creation-bar',
  templateUrl: './room-detail-task-creation-bar.component.html',
  styleUrls: ['./room-detail-task-creation-bar.component.scss'],
})
export class RoomDetailTaskCreationBarComponent implements OnInit {
  data = '';
  pending = false;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor(
    private state: RoomDetailState,
    private notifier: NotifierService,
    private listGql: MembershipTaskListGQL,
    private gql: TaskCreateGQL,
  ) {}

  ngOnInit(): void {}

  create(): void {
    if (this.pending) return;
    this.pending = true;

    combineLatest([this.state.room$, this.state.membership$.pipe(skipFalsy())])
      .pipe(
        first(),
        concatMap(([room, membership]) =>
          this.gql.mutate(
            { data: { room: room.id, title: this.data } },
            {
              update: (_, result) => {
                this.listGql
                  .watch({ id: membership.id })
                  .updateQuery((prev) => ({
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
          ),
        ),
      )
      .subscribe({
        next: () => {
          this.notifier.notify(
            NotificationType.Success,
            $localize`Task created`,
          );
          this.data = '';
          setTimeout(() => this.input.nativeElement.focus());
          this.pending = false;
        },
        error: () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Failed to create the task`,
          );
          this.pending = false;
        },
      });
  }
}
