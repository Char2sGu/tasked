import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Apollo } from 'apollo-angular';
import { from } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { NotificationType } from '../../common/notification-type.enum';

@Component({
  selector: 'app-refetch-button',
  templateUrl: './refetch-button.component.html',
  styleUrls: ['./refetch-button.component.scss'],
})
export class RefetchButtonComponent implements OnInit {
  loading = false;
  disabled = false;

  constructor(private apollo: Apollo, private notifier: NotifierService) {}

  ngOnInit(): void {}

  refetch(): void {
    if (this.disabled) return;
    this.disabled = true;
    this.loading = true;
    from(this.apollo.client.refetchQueries({ include: 'active' }))
      .pipe(
        tap(() => {
          this.loading = false;
          this.notifier.notify(
            NotificationType.Success,
            $localize`Data refreshed`,
          );
        }),

        tap(() => (this.disabled = false)),
        finalize(() => {
          this.loading = false;
          this.disabled = false;
        }),
      )
      .subscribe();
  }
}
