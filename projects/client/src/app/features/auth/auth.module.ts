import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { LoadingModule } from '../../components/loading/loading.module';
import { ThemeButtonModule } from '../../components/theme-button/theme-button.module';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormSignupComponent } from './auth-form-signup/auth-form-signup.component';
import { AuthRoutingModule } from './auth-routing.module';

// TODO: better auto-focus implementation

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormLoginComponent,
    AuthFormSignupComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    LayoutModule,
    LoadingModule,
    ThemeButtonModule,
  ],
})
export class AuthModule {}
