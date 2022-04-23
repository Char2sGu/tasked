import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from '../modal/modal.module';
import { UsernameModule } from '../username/username.module';
import { ProfileBtnComponent } from './profile-btn/profile-btn.component';
import { ProfileBtnMenuComponent } from './profile-btn-menu/profile-btn-menu.component';
import { ProfileBtnMenuEditPopupComponent } from './profile-btn-menu-edit-popup/profile-btn-menu-edit-popup.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

// TODO: move to sidebar

@NgModule({
  declarations: [
    ProfileBtnComponent,
    ProfileBtnMenuComponent,
    ProfileBtnMenuEditPopupComponent,
    ProfileFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatOptionModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    UsernameModule,
    ModalModule,
  ],
  exports: [
    ProfileBtnComponent,
    ProfileBtnMenuComponent,
    ProfileBtnMenuEditPopupComponent,
    ProfileFormComponent,
  ],
})
export class ProfileModule {}
