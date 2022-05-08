import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ModalDirective } from '../../../components/modal/modal.directive';
import { Notifier } from '../../../core/notifier.service';
import {
  MembershipRequestCreateGQL,
  MembershipRequestListGQL,
  TeamListQuery,
} from '../../../graphql/codegen';

@Component({
  selector: 'app-team-list-item',
  templateUrl: './team-list-item.component.html',
  styleUrls: ['./team-list-item.component.scss'],
})
export class TeamListItemComponent implements OnInit {
  @Input() team?: Team;
  message = '';
  loading = false;

  @ViewChild(ModalDirective) private modal!: ModalDirective;

  constructor(
    private router: Router,
    private notifier: Notifier,
    private membershipRequestCreateGql: MembershipRequestCreateGQL,
    private membershipRequestListGql: MembershipRequestListGQL,
  ) {}

  ngOnInit(): void {}

  handleClick(): void {
    if (!this.team) return;
    if (this.team.membership)
      this.router.navigate(['/app/teams', this.team.id]);
    else this.modal.open();
  }

  apply(): void {
    if (!this.team) return;
    this.loading = true;
    this.membershipRequestCreateGql
      .mutate(
        {
          data: { team: this.team.id, message: this.message },
        },
        {
          update: (_, result) => {
            const query = this.membershipRequestListGql.watch();
            if (query.getCurrentResult().loading) return;
            query.updateQuery((prev) => ({
              ...prev,
              membershipRequests: {
                ...prev.membershipRequests,
                results: [
                  result.data!.createMembershipRequest,
                  ...prev.membershipRequests.results,
                ],
              },
            }));
          },
        },
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.notifier.success($localize`MembershipRequest sent`);
          this.modal.close();
          this.router.navigate(['/app/membership-requests']);
        },
        error: () => {
          this.notifier.error($localize`Failed to send the request`);
        },
      });
  }
}

type Team = TeamListQuery['teams']['results'][number];
