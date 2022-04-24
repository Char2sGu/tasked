import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import { ModalRef } from '../../../components/modal/modal.directive';
import {
  AssignmentCreateGQL,
  AssignmentDeleteGQL,
  Role,
  RoomMembershipListGQL,
  RoomMembershipListQuery,
  TaskAssignmentListGQL,
  TaskAssignmentListQuery,
} from '../../../graphql';
import { Task } from '../room-detail-tasks/room-detail-tasks.component';

@Component({
  selector: 'app-room-detail-tasks-item-assign-popup',
  templateUrl: './room-detail-tasks-item-assign-popup.component.html',
  styleUrls: ['./room-detail-tasks-item-assign-popup.component.scss'],
})
export class RoomDetailTasksItemAssignPopupComponent
  implements OnInit, OnDestroy
{
  @Input() task?: Task;
  items: Item[] = [];
  loadingInitial = true;
  loadingUpdate = false;

  private taskId!: string;
  private subscription?: Subscription;

  constructor(
    public modal: ModalRef,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private membershipListGqL: RoomMembershipListGQL,
    private assignmentListGql: TaskAssignmentListGQL,
    private assignmentCreateGql: AssignmentCreateGQL,
    private assignmentDeleteGql: AssignmentDeleteGQL,
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.parent!.snapshot.paramMap.get('id')!;
    if (this.task)
      this.subscription = combineLatest([
        this.membershipListGqL
          .watch({ id: this.taskId })
          .valueChanges.pipe(
            map((result) => result.data.room.memberships.results),
          ),
        this.assignmentListGql
          .watch({ id: this.task.id })
          .valueChanges.pipe(
            map((result) => result.data.task.assignments.results),
          ),
      ]).subscribe(([memberships, assignments]) => {
        this.loadingInitial = false;

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

        this.items = Object.values(items);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  update(): void {
    if (!this.task) return;
    if (this.loadingUpdate) return;
    this.loadingUpdate = true;

    const operations = this.items
      .filter((item) => {
        const isChanged = item.selected != !!item.assignment;
        return isChanged;
      })
      .map((item) => {
        if (item.assignment)
          return this.deleteAssignment(item.assignment).pipe(
            map(() => 'deletion' as const),
          );
        else
          return this.createAssignment(item.membership).pipe(
            map(() => 'creation' as const),
          );
      });

    if (operations)
      forkJoin(operations)
        .pipe(
          finalize(() => {
            this.loadingUpdate = false;
            // Close the popup whether succeed or not because I'm lazy to
            // restore the selections if it fails. :]
            this.modal.close();
          }),
        )
        .subscribe(
          (results) => {
            const { creation, deletion } = results.reduce(
              (counter, operation) => {
                if (operation == 'creation') counter.creation++;
                else counter.deletion++;
                return counter;
              },
              { creation: 0, deletion: 0 },
            );
            this.notifier.notify(
              NotificationType.Success,
              $localize`Assigned: ${creation}; Revoked: ${deletion}`,
            );
          },
          () => {
            this.notifier.notify(
              NotificationType.Error,
              $localize`Failed to update the assignments`,
            );
          },
        );
  }

  identifyItem(index: number, item: Item): string {
    return item.membership.id;
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
  RoomMembershipListQuery['room']['memberships']['results'][number];

type Assignment =
  TaskAssignmentListQuery['task']['assignments']['results'][number];

interface Item {
  membership: Membership;
  selected: boolean;
  assignment?: Assignment;
}
