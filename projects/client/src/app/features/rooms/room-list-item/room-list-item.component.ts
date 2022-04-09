import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import { ModalComponent } from '../../../components/modal/modal/modal.component';
import {
  ApplicationCreateGQL,
  ApplicationListGQL,
  RoomListQuery,
} from '../../../graphql';

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.scss'],
})
export class RoomListItemComponent implements OnInit {
  @Input() room?: Room;
  message = '';
  loading = false;

  @ViewChild(ModalComponent) private popup!: ModalComponent;

  constructor(
    private router: Router,
    private notifier: NotifierService,
    private applicationCreateGql: ApplicationCreateGQL,
    private applicationListGql: ApplicationListGQL,
  ) {}

  ngOnInit(): void {}

  handleClick(): void {
    if (!this.room) return;
    if (this.room.membership)
      this.router.navigate(['/app/rooms', this.room.id]);
    else this.popup.open();
  }

  apply(): void {
    if (!this.room) return;
    this.loading = true;
    this.applicationCreateGql
      .mutate(
        {
          data: { room: this.room.id, message: this.message },
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
          this.popup.close();
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

type Room = RoomListQuery['rooms']['results'][number];
