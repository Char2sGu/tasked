import { Component, OnInit } from '@angular/core';

import { ModalRef } from '../../../components/modal/modal.directive';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings-edit-nickname-modal',
  templateUrl: './settings-edit-nickname-modal.component.html',
  styleUrls: ['./settings-edit-nickname-modal.component.scss'],
})
export class SettingsEditNicknameModalComponent implements OnInit {
  user$ = this.settingsService.user$;
  value?: string;
  constructor(
    private modalRef: ModalRef,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {}

  onSave(): void {
    this.modalRef.close();
    this.settingsService
      .saveProfile({ nickname: this.value })
      .subscribe(
        this.settingsService.buildNotifyingObserver(
          'Nickname updated',
          'Update failed',
        ),
      );
  }
}
