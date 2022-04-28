import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BackButtonModule } from '../../components/back-button/back-button.module';
import { ModalModule } from '../../components/modal/modal.module';
import { RadioListModule } from '../../components/radio-list/radio-list.module';
import { ThemeSwitcherModule } from '../../components/theme-switcher/theme-switcher.module';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsEditFullNameModalComponent } from './settings-edit-full-name-modal/settings-edit-full-name-modal.component';
import { SettingsEditGenderModalComponent } from './settings-edit-gender-modal/settings-edit-gender-modal.component';
import { SettingsEditModalComponent } from './settings-edit-modal/settings-edit-modal.component';
import { SettingsEditPasswordModalComponent } from './settings-edit-password-modal/settings-edit-password-modal.component';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingsListButtonItemComponent } from './settings-list-button-item/settings-list-button-item.component';
import { SettingsListNormalItemComponent } from './settings-list-normal-item/settings-list-normal-item.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsListComponent,
    SettingsEditFullNameModalComponent,
    SettingsEditPasswordModalComponent,
    SettingsEditGenderModalComponent,
    SettingsEditModalComponent,
    SettingsListButtonItemComponent,
    SettingsListNormalItemComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BackButtonModule,
    RadioListModule,
    MatSnackBarModule,
    ModalModule,
    ThemeSwitcherModule,
  ],
})
export class SettingsModule {}
