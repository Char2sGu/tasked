import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ContainerModule } from '../../components/container/container.module';
import { HelpIconModule } from '../../components/help-icon/help-icon.module';
import { InfinityScrollModule } from '../../components/infinity-scroll/infinity-scroll.module';
import { LoadingModule } from '../../components/loading/loading.module';
import { ModalModule } from '../../components/modal/modal.module';
import { UsernameModule } from '../../components/username/username.module';
import { SharedModule } from '../../shared/shared.module';
import { RoomCreationComponent } from './room-creation/room-creation.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomDetailAssignmentsComponent } from './room-detail-assignments/room-detail-assignments.component';
import { RoomDetailAssignmentsItemComponent } from './room-detail-assignments-item/room-detail-assignments-item.component';
import { RoomDetailAssignmentsItemDetailComponent } from './room-detail-assignments-item-detail/room-detail-assignments-item-detail.component';
import { RoomDetailSettingsComponent } from './room-detail-settings/room-detail-settings.component';
import { RoomDetailSettingsActionsComponent } from './room-detail-settings-actions/room-detail-settings-actions.component';
import { RoomDetailSettingsSectionComponent } from './room-detail-settings-section/room-detail-settings-section.component';
import { RoomDetailSidebarComponent } from './room-detail-sidebar/room-detail-sidebar.component';
import { RoomDetailSidebarMembershipListComponent } from './room-detail-sidebar-membership-list/room-detail-sidebar-membership-list.component';
import { RoomDetailSidebarMembershipListItemComponent } from './room-detail-sidebar-membership-list-item/room-detail-sidebar-membership-list-item.component';
import { RoomDetailSidebarMembershipListItemMenuComponent } from './room-detail-sidebar-membership-list-item-menu/room-detail-sidebar-membership-list-item-menu.component';
import { RoomDetailTabRedirectorComponent } from './room-detail-tab-redirector/room-detail-tab-redirector.component';
import { RoomDetailTasksComponent } from './room-detail-tasks/room-detail-tasks.component';
import { RoomDetailTasksItemComponent } from './room-detail-tasks-item/room-detail-tasks-item.component';
import { RoomDetailTasksItemAssignPopupComponent } from './room-detail-tasks-item-assign-popup/room-detail-tasks-item-assign-popup.component';
import { RoomDetailTasksItemEditPopupComponent } from './room-detail-tasks-item-edit-popup/room-detail-tasks-item-edit-popup.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomListItemComponent } from './room-list-item/room-list-item.component';
import { RoomRedirectorComponent } from './room-redirector/room-redirector.component';
import { RoomsComponent } from './rooms.component';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomDetailComponent,
    RoomCreationComponent,
    RoomDetailAssignmentsComponent,
    RoomDetailAssignmentsItemComponent,
    RoomDetailAssignmentsItemDetailComponent,
    RoomDetailTasksComponent,
    RoomDetailTasksItemComponent,
    RoomDetailTasksItemAssignPopupComponent,
    RoomDetailSettingsComponent,
    RoomDetailSettingsSectionComponent,
    RoomDetailSettingsActionsComponent,
    RoomDetailTabRedirectorComponent,
    RoomDetailSidebarComponent,
    RoomDetailSidebarMembershipListComponent,
    RoomDetailSidebarMembershipListItemComponent,
    RoomDetailSidebarMembershipListItemMenuComponent,
    RoomRedirectorComponent,
    RoomListComponent,
    RoomListItemComponent,
    RoomDetailTasksItemEditPopupComponent,
  ],
  imports: [
    SharedModule,
    RoomsRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    NgxSkeletonLoaderModule,
    NgxMasonryModule,
    InfinityScrollModule,
    ModalModule,
    HelpIconModule,
    LoadingModule,
    UsernameModule,
    ContainerModule,
  ],
})
export class RoomsModule {}
