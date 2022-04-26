import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { combineLatest, concatMap, first } from 'rxjs';

import { NotificationType } from '../../../common/notification-type.enum';
import { skipFalsy } from '../../../common/rxjs';
import { MembershipTaskListGQL, TaskCreateGQL } from '../../../graphql';
import { TeamDetailState } from '../team-detail/team-detail-state.service';

@Component({
  selector: 'app-team-detail-task-creation-bar',
  templateUrl: './team-detail-task-creation-bar.component.html',
  styleUrls: ['./team-detail-task-creation-bar.component.scss'],
})
export class TeamDetailTaskCreationBarComponent implements OnInit {
  data = '';
  pending = false;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor(
    private state: TeamDetailState,
    private notifier: NotifierService,
    private listGql: MembershipTaskListGQL,
    private gql: TaskCreateGQL,
  ) {}

  ngOnInit(): void {}

  create(): void {
    if (this.pending) return;
    this.pending = true;

    combineLatest([this.state.team$, this.state.membership$.pipe(skipFalsy())])
      .pipe(
        first(),
        concatMap(([team, membership]) =>
          this.gql.mutate(
            { data: { room: team.id, title: this.data } },
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
