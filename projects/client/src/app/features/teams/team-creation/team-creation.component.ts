import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Notifier } from '../../../core/notifier.service';
import { RoomCreateGQL, RoomListGQL } from '../../../graphql/codegen';

@Component({
  selector: 'app-team-creation',
  templateUrl: './team-creation.component.html',
  styleUrls: ['./team-creation.component.scss'],
})
export class TeamCreationComponent implements OnInit {
  data = {
    name: '',
    description: '',
  };

  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifier: Notifier,
    private createGql: RoomCreateGQL,
    private listGql: RoomListGQL,
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.loading = true;
    this.createGql
      .mutate(
        { data: this.data },
        {
          update: (_, result) => {
            const queries = [
              this.listGql.watch(),
              this.listGql.watch({ joinedOnly: true }),
            ];
            queries
              .filter((query) => query.getCurrentResult().data)
              .forEach((query) =>
                query.updateQuery((prev) => ({
                  ...prev,
                  rooms: {
                    ...prev.rooms,
                    total: prev.rooms.total + 1,
                    results: [...prev.rooms.results, result.data!.createRoom],
                  },
                })),
              );
          },
        },
      )
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (result) => {
          this.router.navigate(['/app/rooms', result.data!.createRoom.id], {
            relativeTo: this.route,
          });
        },
        error: () => {
          this.notifier.error($localize`Operation failed`);
        },
      });
  }
}
