import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Role,
  RoomDetailGQL,
  RoomMembershipListQuery,
} from '../../../graphql/codegen';

type Membership =
  RoomMembershipListQuery['room']['memberships']['results'][number];

@Component({
  selector: 'app-team-detail-tabs-sidebar-membership-list-item',
  templateUrl: './team-detail-tabs-sidebar-membership-list-item.component.html',
  styleUrls: ['./team-detail-tabs-sidebar-membership-list-item.component.scss'],
})
export class TeamDetailSidebarMembershipListItemComponent
  implements OnInit, OnDestroy
{
  @Input() membership?: Membership;
  icon?: string;
  iconColor?: string | null;
  roleText = {
    [Role.Member]: $localize`Member`,
    [Role.Manager]: $localize`Manager`,
  };

  @ViewChild(MatMenuTrigger) private menuTrigger?: MatMenuTrigger;
  private subscription?: Subscription;

  constructor(private route: ActivatedRoute, private teamGql: RoomDetailGQL) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.subscription?.unsubscribe();
      this.subscription = this.teamGql
        .watch({ id: params.get('id')! })
        .valueChanges.pipe(map(({ data }) => data.room))
        .subscribe((team) => {
          if (!this.membership) return;

          this.icon =
            this.membership.role == Role.Member ? 'person' : 'manage_accounts';

          this.iconColor =
            this.membership.owner.id == team.creator?.id ? 'accent' : null;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Open a menu exactly on where the user clicks.
   *
   * Inspired by https://stackoverflow.com/questions/47527529/how-to-change-absolute-position-of-mat-menu-in-angular-4-material-using-x-and-y
   *
   * @param event
   * @param item
   * @param helper
   */
  openMenu(event: MouseEvent, item: HTMLElement, helper: HTMLElement): void {
    const { left: itemX, top: itemY } = item.getBoundingClientRect();
    const { clientX, clientY } = event;
    const left = clientX - itemX;
    const top = clientY - itemY;
    helper.style.left = `${left}px`;
    helper.style.top = `${top}px`;
    this.menuTrigger?.openMenu();
  }
}
