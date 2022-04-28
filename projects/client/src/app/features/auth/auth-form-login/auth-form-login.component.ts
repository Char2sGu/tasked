import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { finalize, throttleTime } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.scss'],
})
export class AuthFormLoginComponent implements OnInit {
  data = { username: '', password: '' };
  loading = false;
  submit$$ = new Subject<Event>();

  @ViewChild(MatInput) set firstInput(input: MatInput) {
    setTimeout(() => input.focus());
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    this.submit$$.pipe(throttleTime(1000)).subscribe(() => this.submit());
  }

  private submit() {
    const { username, password } = this.data;
    this.loading = true;
    this.auth
      .login(username, password)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Invalid username or password`,
          );
        },
      });
  }
}
