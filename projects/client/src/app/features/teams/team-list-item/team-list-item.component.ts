import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import { ModalDirective } from '../../../components/modal/modal.directive';
import {
  ApplicationCreateGQL,
  ApplicationListGQL,
  RoomListQuery,
} from '../../../graphql';

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
    private notifier: NotifierService,
    private applicationCreateGql: ApplicationCreateGQL,
    private applicationListGql: ApplicationListGQL,
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
    this.applicationCreateGql
      .mutate(
        {
          data: { room: this.team.id, message: this.message },
        },
        {
          update: (_, result) => {
            const query = this.applicationListGql.watch();
            if (query.getCurrentResult().loading) return;
            query.updateQuery((prev) => ({
              ...prev,
              applications: {
                ...prev.applications,
                results: [
                  result.data!.createApplication,
                  ...prev.applications.results,
                ],
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
            $localize`Application sent`,
          );
          this.modal.close();
          this.router.navigate(['/app/applications']);
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Failed to send the application`,
          );
        },
      );
  }
}

type Team = RoomListQuery['rooms']['results'][number];
