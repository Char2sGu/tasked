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
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { BackButtonModule } from '../../components/back-button/back-button.module';
import { ConfirmationModule } from '../../components/confirmation/confirmation.module';
import { ContainerModule } from '../../components/container/container.module';
import { EmptyStateModule } from '../../components/empty-state/empty-state.module';
import { HelpIconModule } from '../../components/help-icon/help-icon.module';
import { IllustrationModule } from '../../components/illustration/illustration.module';
import { InfinityScrollModule } from '../../components/infinity-scroll/infinity-scroll.module';
import { LoadingModule } from '../../components/loading/loading.module';
import { MasonryModule } from '../../components/masonry/masonry.module';
import { ModalModule } from '../../components/modal/modal.module';
import { UsernameModule } from '../../components/username/username.module';
import { SharedModule } from '../../shared/shared.module';
import { TeamCreationComponent } from './team-creation/team-creation.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamDetailAssignmentsComponent } from './team-detail-assignments/team-detail-assignments.component';
import { TeamDetailAssignmentsItemComponent } from './team-detail-assignments-item/team-detail-assignments-item.component';
import { TeamDetailAssignmentsItemDetailComponent } from './team-detail-assignments-item-detail/team-detail-assignments-item-detail.component';
import { TeamDetailSettingsComponent } from './team-detail-settings/team-detail-settings.component';
import { TeamDetailSettingsActionsComponent } from './team-detail-settings-actions/team-detail-settings-actions.component';
import { TeamDetailSettingsSectionComponent } from './team-detail-settings-section/team-detail-settings-section.component';
import { TeamDetailSidebarComponent } from './team-detail-sidebar/team-detail-sidebar.component';
import { TeamDetailSidebarMembershipListComponent } from './team-detail-sidebar-membership-list/team-detail-sidebar-membership-list.component';
import { TeamDetailSidebarMembershipListItemComponent } from './team-detail-sidebar-membership-list-item/team-detail-sidebar-membership-list-item.component';
import { TeamDetailSidebarMembershipListItemMenuComponent } from './team-detail-sidebar-membership-list-item-menu/team-detail-sidebar-membership-list-item-menu.component';
import { TeamDetailTabRedirectorComponent } from './team-detail-tab-redirector/team-detail-tab-redirector.component';
import { TeamDetailTaskCreationBarComponent } from './team-detail-task-creation-bar/team-detail-task-creation-bar.component';
import { TeamDetailTasksComponent } from './team-detail-tasks/team-detail-tasks.component';
import { TeamDetailTasksItemComponent } from './team-detail-tasks-item/team-detail-tasks-item.component';
import { TeamDetailTasksItemAssignPopupComponent } from './team-detail-tasks-item-assign-popup/team-detail-tasks-item-assign-popup.component';
import { TeamDetailTasksItemEditPopupComponent } from './team-detail-tasks-item-edit-popup/team-detail-tasks-item-edit-popup.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamListItemComponent } from './team-list-item/team-list-item.component';
import { TeamRedirectorComponent } from './team-redirector/team-redirector.component';
import { TeamsComponent } from './teams.component';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamDetailComponent,
    TeamCreationComponent,
    TeamDetailAssignmentsComponent,
    TeamDetailAssignmentsItemComponent,
    TeamDetailAssignmentsItemDetailComponent,
    TeamDetailTasksComponent,
    TeamDetailTasksItemComponent,
    TeamDetailTasksItemAssignPopupComponent,
    TeamDetailTasksItemEditPopupComponent,
    TeamDetailTaskCreationBarComponent,
    TeamDetailSettingsComponent,
    TeamDetailSettingsSectionComponent,
    TeamDetailSettingsActionsComponent,
    TeamDetailTabRedirectorComponent,
    TeamDetailSidebarComponent,
    TeamDetailSidebarMembershipListComponent,
    TeamDetailSidebarMembershipListItemComponent,
    TeamDetailSidebarMembershipListItemMenuComponent,
    TeamRedirectorComponent,
    TeamListComponent,
    TeamListItemComponent,
  ],
  imports: [
    SharedModule,
    TeamsRoutingModule,
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
    InfinityScrollModule,
    ModalModule,
    HelpIconModule,
    LoadingModule,
    UsernameModule,
    ContainerModule,
    ConfirmationModule,
    MasonryModule,
    EmptyStateModule,
    IllustrationModule,
    BackButtonModule,
  ],
})
export class TeamsModule {}
