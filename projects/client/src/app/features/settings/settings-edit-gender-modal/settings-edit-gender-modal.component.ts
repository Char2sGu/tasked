import { Component, OnInit } from '@angular/core';

import { RadioListOption } from '../../../components/radio-list/radio-list/radio-list.component';
import { Gender } from '../../../graphql/codegen';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings-edit-gender-modal',
  templateUrl: './settings-edit-gender-modal.component.html',
  styleUrls: ['./settings-edit-gender-modal.component.scss'],
})
export class SettingsEditGenderModalComponent implements OnInit {
  user$ = this.settingsService.user$;
  value?: Gender;
  options: RadioListOption[] = [
    { value: Gender.Male, text: 'Male' },
    { value: Gender.Female, text: 'Female' },
    { value: Gender.Unknown, text: 'Other' },
  ];

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {}

  onSave(): void {
    this.settingsService
      .saveProfile({ gender: this.value })
      .subscribe(
        this.settingsService.buildNotifyingObserver(
          'Gender updated',
          'Update failed',
        ),
      );
  }
}
