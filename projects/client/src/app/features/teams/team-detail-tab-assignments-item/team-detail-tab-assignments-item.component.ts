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
import { concat, finalize, map, mapTo, Observable, timer } from 'rxjs';

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
  busy = false;
  isDesktop$ = this.breakpointObserver
    .observe(Breakpoint.Middle)
    .pipe(map((state) => state.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private updateGql: AssignmentUpdateGQL,
    private notifier: Notifier,
  ) {}

  ngOnInit(): void {}

  onRadioButtonClick(): void {
    if (!this.assignment || this.busy) return;
    this.expanded = false;
    this.update(this.assignment, {
      isCompleted: !this.assignment.isCompleted,
    }).subscribe({
      error: () => this.notifier.error('Update failed'),
    });
  }

  onStarButtonClick(): void {
    if (!this.assignment || this.busy) return;
    this.expanded = false;
    this.update(this.assignment, {
      isImportant: !this.assignment.isImportant,
    }).subscribe({
      error: () => this.notifier.error('Star failed'),
    });
  }

  private update(assignment: Assignment, data: Data): Observable<void> {
    const { id, isImportant, isCompleted } = assignment;
    return concat(
      timer(200),
      this.updateGql.mutate(
        { id, data },
        {
          optimisticResponse: {
            ['__typename']: 'Mutation',
            updateAssignment: {
              ['__typename']: 'Assignment',
              id,
              isCompleted,
              isImportant,
              updatedAt: new Date().toISOString(),
              ...data,
            },
          },
        },
      ),
    ).pipe(
      finalize(() => (this.busy = false)),
      mapTo(undefined),
    );
  }
}
