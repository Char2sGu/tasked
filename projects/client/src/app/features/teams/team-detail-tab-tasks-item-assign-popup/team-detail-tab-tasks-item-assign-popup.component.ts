import { Component, Input, OnInit, TrackByFunction } from '@angular/core';
import {
  combineLatest,
  concatMap,
  filter,
  finalize,
  first,
  from,
  map,
  mapTo,
  mergeMap,
  Observable,
  scan,
} from 'rxjs';

import { ModalRef } from '../../../components/modal/modal.directive';
import { Notifier } from '../../../core/notifier.service';
import {
  AssignmentCreateGQL,
  AssignmentDeleteGQL,
  Role,
  TaskAssignmentListGQL,
  TaskAssignmentListQuery,
  TeamMembershipListGQL,
  TeamMembershipListQuery,
} from '../../../graphql/codegen';
import { TeamDetailState } from '../team-detail/team-detail-state.service';
import { Task } from '../team-detail-tab-tasks/team-detail-tab-tasks.component';

@Component({
  selector: 'app-team-detail-tab-tasks-item-assign-popup',
  templateUrl: './team-detail-tab-tasks-item-assign-popup.component.html',
  styleUrls: ['./team-detail-tab-tasks-item-assign-popup.component.scss'],
})
export class TeamDetailTabTasksItemAssignPopupComponent implements OnInit {
  @Input() task?: Task;
  items$!: Observable<Item[]>;
  busy = false;
  itemTracker: TrackByFunction<Item> = (_, item) => item.membership.id;

  constructor(
    public modal: ModalRef,
    private state: TeamDetailState,
    private notifier: Notifier,
    private membershipListGqL: TeamMembershipListGQL,
    private assignmentListGql: TaskAssignmentListGQL,
    private assignmentCreateGql: AssignmentCreateGQL,
    private assignmentDeleteGql: AssignmentDeleteGQL,
  ) {}

  ngOnInit(): void {
    const task = this.task;
    if (!task) return;
    this.items$ = this.state.team$.pipe(
      first(),
      concatMap((team) =>
        combineLatest([
          this.membershipListGqL
            .watch({ id: team.id })
            .valueChanges.pipe(
              map((result) => result.data.team.memberships.results),
            ),
          this.assignmentListGql
            .watch({ id: task.id })
            .valueChanges.pipe(
              map((result) => result.data.task.assignments.results),
            ),
        ]).pipe(
          map(([memberships, assignments]) =>
            this.buildItems(memberships, assignments),
          ),
        ),
      ),
    );
  }

  update(items: Item[]): void {
    if (!this.task || this.busy) return;
    this.busy = true;

    const DELETION = 'deletion';
    const CREATION = 'creation';
    from(items)
      .pipe(
        filter((item) => this.isItemChanged(item)),
        mergeMap((item) =>
          item.assignment
            ? this.deleteAssignment(item.assignment).pipe(mapTo(DELETION))
            : this.createAssignment(item.membership).pipe(mapTo(CREATION)),
        ),
        scan(
          ({ deletion, creation }, operation) =>
            operation == DELETION
              ? { deletion: ++deletion, creation }
              : { creation: ++creation, deletion },
          { creation: 0, deletion: 0 },
        ),
        finalize(() => {
          this.busy = false;
          // Close the popup whether succeed or not because I'm lazy to
          // restore the selections if it fails. :]
          this.modal.close();
        }),
      )
      .subscribe({
        next: ({ creation, deletion }) => {
          this.notifier.success(
            $localize`Assigned: ${creation}; Revoked: ${deletion}`,
          );
        },
        error: () => {
          this.notifier.error($localize`Failed to update the assignments`);
        },
      });
  }

  private buildItems(
    memberships: Membership[],
    assignments: Assignment[],
  ): Item[] {
    const items: Record<string, Item> = {};

    memberships
      .filter((item) => item.role == Role.Member)
      .forEach((membership) => {
        items[membership.id] = {
          membership,
          selected: false,
        };
      });

    assignments.forEach((assignment) => {
      items[assignment.recipient.id].selected = true;
      items[assignment.recipient.id].assignment = assignment;
    });

    return Object.values(items);
  }

  private isItemChanged(item: Item): boolean {
    return item.selected != !!item.assignment;
  }

  private createAssignment(recipient: Membership) {
    return this.assignmentCreateGql.mutate(
      {
        data: { task: this.task!.id, recipient: recipient.id },
      },
      {
        update: (_, result) => {
          const query = this.assignmentListGql.watch({ id: this.task!.id });
          query.updateQuery((prev) => ({
            ...prev,
            task: {
              ...prev.task,
              assignments: {
                ...prev.task.assignments,
                total: prev.task.assignments.total + 1,
                results: [
                  result.data!.createAssignment,
                  ...prev.task.assignments.results,
                ],
              },
            },
          }));
        },
      },
    );
  }

  private deleteAssignment(assignment: Assignment) {
    return this.assignmentDeleteGql.mutate(
      { id: assignment.id },
      {
        update: (cache, result) => {
          cache.evict({ id: cache.identify(result.data!.deleteAssignment) });
          const query = this.assignmentListGql.watch({ id: this.task!.id });
          query.updateQuery((prev) => ({
            ...prev,
            task: {
              ...prev.task,
              assignments: {
                ...prev.task.assignments,
                total: prev.task.assignments.total - 1,
              },
            },
          }));
        },
      },
    );
  }
}

type Membership =
  TeamMembershipListQuery['team']['memberships']['results'][number];

type Assignment =
  TaskAssignmentListQuery['task']['assignments']['results'][number];

interface Item {
  membership: Membership;
  selected: boolean;
  assignment?: Assignment;
}
