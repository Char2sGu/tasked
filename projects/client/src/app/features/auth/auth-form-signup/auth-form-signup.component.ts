import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { concatMap, finalize, throttleTime } from 'rxjs/operators';

import { filterKeys } from '../../../common/form.utils';
import { NotificationType } from '../../../common/notification-type.enum';
import { Gender, UserCreateGQL, UserCreateInput } from '../../../graphql';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-auth-form-signup',
  templateUrl: './auth-form-signup.component.html',
  styleUrls: ['./auth-form-signup.component.scss'],
})
export class AuthFormSignupComponent implements OnInit {
  data = {
    username: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };
  loading = false;
  submit$$ = new Subject<Event>();

  @ViewChild(MatInput) set firstInput(input: MatInput) {
    setTimeout(() => input.focus());
  }

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
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Username "${username}" is already taken`,
          );
        },
      });
  }
}
