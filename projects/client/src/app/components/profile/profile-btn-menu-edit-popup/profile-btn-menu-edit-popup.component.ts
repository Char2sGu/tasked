import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import dayjs, { Dayjs } from 'dayjs';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { filterKeys, pick } from '../../../common/form.utils';
import { NotificationType } from '../../../common/notification-type.enum';
import { AuthService } from '../../../features/auth/auth.service';
import {
  Gender,
  UserFragment,
  UserUpdateGQL,
  UserUpdateInput,
} from '../../../graphql';
import { ModalRef } from '../../modal/modal.directive';
import { ProfileFormData } from '../profile-form/profile-form-data.interface';

@Component({
  selector: 'app-profile-btn-menu-edit-popup',
  templateUrl: './profile-btn-menu-edit-popup.component.html',
  styleUrls: ['./profile-btn-menu-edit-popup.component.scss'],
})
export class ProfileBtnMenuEditPopupComponent implements OnInit {
  data: ProfileFormData = {
    username: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };

  qualifiedDate$!: Observable<Dayjs>;
  canUpdate$!: Observable<boolean>;

  constructor(
    public auth: AuthService,
    private notifier: NotifierService,
    private userUpdateGql: UserUpdateGQL,
    private modal: ModalRef,
  ) {}

  ngOnInit(): void {
    this.auth.user$.pipe(first()).subscribe((user) => {
      this.data.username = user!.username;
      this.data.nickname = user!.nickname ?? '';
      this.data.gender = user!.gender;
    });
    this.qualifiedDate$ = this.auth.user$.pipe(
      map((user) => dayjs(user!.updatedAt).add(5, 'minute')),
    );
    this.canUpdate$ = this.qualifiedDate$.pipe(
      map((date) => dayjs().isAfter(date)),
    );
  }

  submit(): void {
    this.auth.user$.pipe(first()).subscribe((user) => {
      const id = user!.id + '';
      const data = this.cleanData(user!);
      this.userUpdateGql.mutate({ id, data }).subscribe(
        () => {
          this.notifier.notify(
            NotificationType.Success,
            $localize`Profile updated successfully`,
          );
          this.modal.close();
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Failed to update the profile`,
          );
        },
      );
    });
  }

  private cleanData(user: UserFragment): UserUpdateInput {
    return filterKeys(
      pick(this.data, ['nickname', 'password', 'gender']),
      (v, k) => v != '' && v != user[k as keyof typeof user],
    );
  }
}
