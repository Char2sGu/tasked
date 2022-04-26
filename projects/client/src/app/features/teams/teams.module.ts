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
import { TeamDetailLayoutDirective } from './team-detail/team-detail-layout.directive';
import { TeamDetailSidebarComponent } from './team-detail-sidebar/team-detail-sidebar.component';
import { TeamDetailSidebarMembershipListComponent } from './team-detail-sidebar-membership-list/team-detail-sidebar-membership-list.component';
import { TeamDetailSidebarMembershipListItemComponent } from './team-detail-sidebar-membership-list-item/team-detail-sidebar-membership-list-item.component';
import { TeamDetailSidebarMembershipListItemMenuComponent } from './team-detail-sidebar-membership-list-item-menu/team-detail-sidebar-membership-list-item-menu.component';
import { TeamDetailTabAssignmentsComponent } from './team-detail-tab-assignments/team-detail-tab-assignments.component';
import { TeamDetailTabAssignmentsItemComponent } from './team-detail-tab-assignments-item/team-detail-tab-assignments-item.component';
import { TeamDetailTabAssignmentsItemDetailComponent } from './team-detail-tab-assignments-item-detail/team-detail-tab-assignments-item-detail.component';
import { TeamDetailTabRedirectorComponent } from './team-detail-tab-redirector/team-detail-tab-redirector.component';
import { TeamDetailTabSettingsComponent } from './team-detail-tab-settings/team-detail-tab-settings.component';
import { TeamDetailTabSettingsActionsComponent } from './team-detail-tab-settings-actions/team-detail-tab-settings-actions.component';
import { TeamDetailTabSettingsSectionComponent } from './team-detail-tab-settings-section/team-detail-tab-settings-section.component';
import { TeamDetailTabTasksComponent } from './team-detail-tab-tasks/team-detail-tab-tasks.component';
import { TeamDetailTabTasksItemComponent } from './team-detail-tab-tasks-item/team-detail-tab-tasks-item.component';
import { TeamDetailTabTasksItemAssignPopupComponent } from './team-detail-tab-tasks-item-assign-popup/team-detail-tab-tasks-item-assign-popup.component';
import { TeamDetailTabTasksItemEditPopupComponent } from './team-detail-tab-tasks-item-edit-popup/team-detail-tab-tasks-item-edit-popup.component';
import { TeamDetailTabsComponent } from './team-detail-tabs/team-detail-tabs.component';
import { TeamDetailTaskCreationBarComponent } from './team-detail-task-creation-bar/team-detail-task-creation-bar.component';
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
    TeamDetailTabAssignmentsComponent,
    TeamDetailTabAssignmentsItemComponent,
    TeamDetailTabAssignmentsItemDetailComponent,
    TeamDetailTabTasksComponent,
    TeamDetailTabTasksItemComponent,
    TeamDetailTabTasksItemAssignPopupComponent,
    TeamDetailTabTasksItemEditPopupComponent,
    TeamDetailTaskCreationBarComponent,
    TeamDetailTabSettingsComponent,
    TeamDetailTabSettingsSectionComponent,
    TeamDetailTabSettingsActionsComponent,
    TeamDetailTabRedirectorComponent,
    TeamDetailSidebarComponent,
    TeamDetailSidebarMembershipListComponent,
    TeamDetailSidebarMembershipListItemComponent,
    TeamDetailSidebarMembershipListItemMenuComponent,
    TeamRedirectorComponent,
    TeamListComponent,
    TeamListItemComponent,
    TeamDetailTabsComponent,
    TeamDetailLayoutDirective,
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
