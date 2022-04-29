import { Component, OnInit } from '@angular/core';

import { ModalRef } from '../../../components/modal/modal.directive';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings-edit-password-modal',
  templateUrl: './settings-edit-password-modal.component.html',
  styleUrls: ['./settings-edit-password-modal.component.scss'],
})
export class SettingsEditPasswordModalComponent implements OnInit {
  value = '';
  valueForConfirm = '';
  constructor(
    private modalRef: ModalRef,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {}

  onSave(): void {
    this.modalRef.close();
    this.settingsService
      .saveProfile({ password: this.value })
      .subscribe(
        this.settingsService.buildNotifyingObserver(
          'Password updated',
          'Update failed',
        ),
      );
  }
}
