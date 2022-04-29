import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, throttleTime } from 'rxjs/operators';

import { AuthService } from '../../../core/auth.service';
import { Notifier } from '../../../core/notifier.service';

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
    private notifier: Notifier,
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
          this.notifier.error($localize`Invalid username or password`);
        },
      });
  }
}
