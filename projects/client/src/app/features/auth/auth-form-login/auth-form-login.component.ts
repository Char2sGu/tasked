import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { finalize, throttleTime } from 'rxjs/operators';

import { NotificationType } from '../../../common/notification-type.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.scss'],
})
export class AuthFormLoginComponent implements OnInit {
  data = { username: '', password: '' };
  loading = false;
  submit$$ = new Subject<Event>();

  @ViewChild(MatInput) private firstInput?: MatInput;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    this.submit$$.pipe(throttleTime(1000)).subscribe(() => this.submit());
    setTimeout(() => {
      this.firstInput?.focus();
    });
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
      .subscribe(
        () => {
          const next = this.route.snapshot.queryParams['next'];
          this.router.navigate([next ?? '/']);
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Invalid username or password`,
          );
        },
      );
  }
}
