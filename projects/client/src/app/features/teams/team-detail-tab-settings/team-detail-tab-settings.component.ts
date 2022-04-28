import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, finalize, first, map } from 'rxjs/operators';

import { filterKeys, pick } from '../../../common/form.utils';
import { isEmpty } from '../../../common/form.utils';
import { NotificationType } from '../../../common/notification-type.enum';
import { AuthService } from '../../../core/auth.service';
import {
  RoomDetailGQL,
  RoomDetailQuery,
  RoomUpdateGQL,
  RoomUpdateInput,
} from '../../../graphql';

type Team = RoomDetailQuery['room'];

@Component({
  selector: 'app-team-detail-tab-settings',
  templateUrl: './team-detail-tab-settings.component.html',
  styleUrls: ['./team-detail-tab-settings.component.scss'],
})
export class TeamDetailTabSettingsComponent implements OnInit {
  data: RoomUpdateInput = {
    name: '',
    description: '',
    isOpen: false,
  };

  change$$ = new Subject();
  team$!: Observable<Team>;
  isCreator$!: Observable<boolean>;
  modified$!: Observable<boolean>;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifier: NotifierService,
    private queryGql: RoomDetailGQL,
    private updateGql: RoomUpdateGQL,
  ) {}

  ngOnInit(): void {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;

    this.team$ = this.queryGql
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.room));

    this.isCreator$ = combineLatest([this.team$, this.auth.user$]).pipe(
      map(([team, user]) => team.creator.id == user!.id),
    );

    this.modified$ = combineLatest([this.team$, this.change$$]).pipe(
      debounceTime(100),
      map(([team]) => isEmpty(filterKeys(this.data, (v, k) => v != team[k]))),
    );

    this.reset();
  }

  reset(): void {
    this.team$.pipe(first()).subscribe((team) => {
      const currentValues = pick(team, ['name', 'description', 'isOpen']);
      this.data = currentValues;
      this.change$$.next(undefined);
    });
  }

  save(): void {
    this.team$.pipe(first()).subscribe((team) => {
      const data = filterKeys(this.data, (v, k) => v != team[k]);
      this.loading = true;
      this.updateGql
        .mutate({ id: team.id, data })
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
        )
        .subscribe(
          () => {
            this.notifier.notify(
              NotificationType.Success,
              $localize`Changes have been saved successfully`,
            );
          },
          () => {
            this.notifier.notify(
              NotificationType.Error,
              $localize`Failed to save the changes`,
            );
          },
        );
    });
  }
}
