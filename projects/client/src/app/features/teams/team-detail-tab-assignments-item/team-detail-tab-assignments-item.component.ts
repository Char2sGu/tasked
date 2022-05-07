import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { AnimationCurves } from '@angular/material/core';
import { Data } from '@angular/router';
import { timer } from 'rxjs';
import { concatMap, finalize, map } from 'rxjs/operators';

import { Breakpoint } from '../../../common/breakpoint.enum';
import { Notifier } from '../../../core/notifier.service';
import {
  AssignmentUpdateGQL,
  MembershipAssignmentListQuery,
} from '../../../graphql/codegen';

type Assignment =
  MembershipAssignmentListQuery['membership']['assignments']['results'][number];

@Component({
  selector: 'app-team-detail-tab-assignments-item',
  templateUrl: './team-detail-tab-assignments-item.component.html',
  styleUrls: ['./team-detail-tab-assignments-item.component.scss'],
  animations: [
    trigger('expansion', [
      state(
        'false, void',
        style({
          height: '0',
          visibility: 'hidden',
          margin: '0',
        }),
      ),
      state(
        'true',
        style({
          height: '*',
          visibility: 'visible',
          margin: '*',
        }),
      ),
      transition('false <=> true, true => void', [
        animate(`225ms ${AnimationCurves.STANDARD_CURVE}`),
      ]),
    ]),
  ],
})
export class TeamDetailTabAssignmentsItemComponent implements OnInit {
  @Input() assignment?: Assignment;
  expanded = false;

  isDesktop$ = this.breakpointObserver
    .observe(Breakpoint.Middle)
    .pipe(map((state) => state.matches));

  private loading = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private updateGql: AssignmentUpdateGQL,
    private notifier: Notifier,
  ) {}

  ngOnInit(): void {}

  toggleCompletion(): void {
    if (!this.assignment) return;
    this.update({ isCompleted: !this.assignment.isCompleted });
  }

  toggleImportance(): void {
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
          this.notifier.error($localize`Failed to update the assignment`);
        },
      });
  }
}
