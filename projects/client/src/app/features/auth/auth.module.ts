import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { LayoutModule } from '../../components/layout/layout.module';
import { LoadingModule } from '../../components/loading/loading.module';
import { ProfileModule } from '../../components/profile/profile.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthFormLayoutComponent } from './auth-form-layout/auth-form-layout.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormSignupComponent } from './auth-form-signup/auth-form-signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormLayoutComponent,
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
    LayoutModule,
    ProfileModule,
    LoadingModule,
  ],
})
export class AuthModule {}
