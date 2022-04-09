import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Gender, UserFragment } from '../../../graphql';

type User = Pick<UserFragment, 'username' | 'nickname'> &
  Partial<Pick<UserFragment, 'gender'>>;

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
})
export class UsernameComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Input() color = false;
  classList: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.updateClassList();
  }

  ngOnChanges(): void {
    this.updateClassList();
  }

  private updateClassList() {
    if (!this.user?.gender || !this.color) return;
    this.classList =
      this.user.gender == Gender.Male
        ? ['text--blue']
        : this.user.gender == Gender.Female
        ? ['text--pink']
        : [];
  }
}
