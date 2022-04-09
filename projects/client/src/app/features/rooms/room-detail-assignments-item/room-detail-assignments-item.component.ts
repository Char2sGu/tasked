import { Component, Input, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { timer } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import {
  AssignmentUpdateGQL,
  MembershipAssignmentListQuery,
} from '../../../graphql';

type Assignment =
  MembershipAssignmentListQuery['membership']['assignments']['results'][number];

@Component({
  selector: 'app-room-detail-assignments-item',
  templateUrl: './room-detail-assignments-item.component.html',
  styleUrls: ['./room-detail-assignments-item.component.scss'],
})
export class RoomDetailAssignmentsItemComponent implements OnInit {
  @Input() assignment?: Assignment;

  completionIcon = '';
  completionTooltip = '';

  importanceIcon = '';
  importanceTooltip = '';

  private loading = false;

  constructor(
    private updateGql: AssignmentUpdateGQL,
    private notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    if (!this.assignment) return;

    this.completionIcon = this.assignment.isCompleted
      ? 'radio_button_checked'
      : 'radio_button_unchecked';
    this.completionTooltip = this.assignment.isCompleted
      ? $localize`Mark as pending`
      : $localize`Mark as completed`;
    this.importanceIcon = this.assignment.isImportant ? 'star' : 'star_outline';
    this.importanceTooltip = this.assignment.isImportant
      ? $localize`Remove importance mark`
      : $localize`Mark as important`;
  }

  switchCompletion(): void {
    if (!this.assignment) return;
    this.update({ isCompleted: !this.assignment.isCompleted });
  }

  switchImportance(): void {
    if (!this.assignment) return;
    this.update({ isImportant: !this.assignment.isImportant });
  }

  private update(data: Data) {
    if (!this.assignment) return;
    if (this.loading) return;

    const { id, isImportant, isCompleted } = this.assignment;

    this.loading = true;
    timer(200)
      .pipe(
        concatMap(() =>
          this.updateGql.mutate(
            {
              id: this.assignment!.id,
              data,
            },
            {
              optimisticResponse: {
                __typename: 'Mutation',
                updateAssignment: {
                  __typename: 'Assignment',
                  id,
                  isCompleted,
                  isImportant,
                  updatedAt: new Date().toISOString(),
                  ...data,
                },
              },
            },
          ),
        ),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        error: () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Failed to update the assignment`,
          );
        },
      });
  }
}
