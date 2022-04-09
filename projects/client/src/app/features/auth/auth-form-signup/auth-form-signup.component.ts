import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { concatMap, finalize, throttleTime } from 'rxjs/operators';

import { filterKeys } from '../../../common/filter-keys.func';
import { NotificationType } from '../../../common/notification-type.enum';
import { ProfileFormData } from '../../../components/profile/profile-form/profile-form-data.interface';
import { Gender, UserCreateGQL, UserCreateInput } from '../../../graphql';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form-signup',
  templateUrl: './auth-form-signup.component.html',
  styleUrls: ['./auth-form-signup.component.scss'],
})
export class AuthFormSignupComponent implements OnInit {
  data: ProfileFormData = {
    username: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };
  loading = false;
  submit$$ = new Subject<Event>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifier: NotifierService,
    private userCreateGql: UserCreateGQL,
  ) {}

  ngOnInit(): void {
    this.submit$$.pipe(throttleTime(1000)).subscribe(() => this.submit());
  }

  private submit() {
    this.loading = true;
    const { username, password, nickname, gender } = this.data;
    const data: UserCreateInput = filterKeys(
      {
        username,
        password,
        nickname,
        gender,
      },
      (v) => v != '',
    );
    this.userCreateGql
      .mutate({ data })
      .pipe(
        concatMap(() => this.auth.login(username, password)),
        finalize(() => (this.loading = false)),
      )
      .subscribe(
        () => {
          const next = this.route.snapshot.queryParams['next'];
          this.router.navigate([next ?? '/']);
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Username "${username}" is already taken`,
          );
        },
      );
  }
}
