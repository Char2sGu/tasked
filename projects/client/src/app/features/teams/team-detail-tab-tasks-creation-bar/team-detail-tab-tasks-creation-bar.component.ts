import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, concatMap, first } from 'rxjs';

import { skipNullable } from '../../../common/rxjs';
import { Notifier } from '../../../core/notifier.service';
import { MembershipTaskListGQL, TaskCreateGQL } from '../../../graphql/codegen';
import { TeamDetailState } from '../team-detail/team-detail-state.service';

@Component({
  selector: 'app-team-detail-tab-tasks-creation-bar',
  templateUrl: './team-detail-tab-tasks-creation-bar.component.html',
  styleUrls: ['./team-detail-tab-tasks-creation-bar.component.scss'],
})
export class TeamDetailTaskCreationBarComponent implements OnInit {
  data = '';
  pending = false;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor(
    private state: TeamDetailState,
    private notifier: Notifier,
    private listGql: MembershipTaskListGQL,
    private gql: TaskCreateGQL,
  ) {}

  ngOnInit(): void {}

  create(): void {
    if (this.pending) return;
    this.pending = true;

    combineLatest([
      this.state.team$,
      this.state.membership$.pipe(skipNullable()),
    ])
      .pipe(
        first(),
        concatMap(([team, membership]) =>
          this.gql.mutate(
            { data: { team: team.id, title: this.data } },
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
          this.notifier.success($localize`Task created`);
          this.data = '';
          setTimeout(() => this.input.nativeElement.focus());
          this.pending = false;
        },
        error: () => {
          this.notifier.error($localize`Failed to create the task`);
          this.pending = false;
        },
      });
  }
}
