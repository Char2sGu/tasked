import { Component, OnInit } from '@angular/core';

import { ModalRef } from '../../../components/modal/modal.directive';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings-edit-full-name-modal',
  templateUrl: './settings-edit-full-name-modal.component.html',
  styleUrls: ['./settings-edit-full-name-modal.component.scss'],
})
export class SettingsEditFullNameModalComponent implements OnInit {
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
