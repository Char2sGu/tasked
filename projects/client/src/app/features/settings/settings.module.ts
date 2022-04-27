import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BackButtonModule } from '../../components/back-button/back-button.module';
import { ModalModule } from '../../components/modal/modal.module';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsEditGenderModalComponent } from './settings-edit-gender-modal/settings-edit-gender-modal.component';
import { SettingsEditNicknameModalComponent } from './settings-edit-nickname-modal/settings-edit-nickname-modal.component';
import { SettingsEditPasswordModalComponent } from './settings-edit-password-modal/settings-edit-password-modal.component';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingsListItemComponent } from './settings-list-item/settings-list-item.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsListItemComponent,
    SettingsListComponent,
    SettingsEditNicknameModalComponent,
    SettingsEditPasswordModalComponent,
    SettingsEditGenderModalComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    BackButtonModule,
    ModalModule,
  ],
})
export class SettingsModule {}
