import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamCreationComponent } from './team-creation/team-creation.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamDetailTabAssignmentsComponent } from './team-detail-tab-assignments/team-detail-tab-assignments.component';
import { TeamDetailTabRedirectorComponent } from './team-detail-tab-redirector/team-detail-tab-redirector.component';
import { TeamDetailTabSettingsComponent } from './team-detail-tab-settings/team-detail-tab-settings.component';
import { TeamDetailTabTasksComponent } from './team-detail-tab-tasks/team-detail-tab-tasks.component';
import { TeamDetailTabsComponent } from './team-detail-tabs/team-detail-tabs.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamRedirectorComponent } from './team-redirector/team-redirector.component';
import { TeamsComponent } from './teams.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    children: [
      {
        path: '',
        component: TeamListComponent,
        data: { animationState: 'list' },
      },
      {
        path: 'create',
        component: TeamCreationComponent,
        data: { animationState: 'creation' },
      },
      {
        path: 'last',
        component: TeamRedirectorComponent,
      },
      {
        path: ':id',
        component: TeamDetailComponent,
        data: { animationState: 'detail' },
        children: [
          {
            path: '',
            component: TeamDetailTabRedirectorComponent,
            pathMatch: 'exact',
          },
          {
            path: '',
            component: TeamDetailTabsComponent,
            children: [
              {
                path: 'assignments',
                component: TeamDetailTabAssignmentsComponent,
              },
              {
                path: 'tasks',
                component: TeamDetailTabTasksComponent,
              },
              {
                path: 'settings',
                component: TeamDetailTabSettingsComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
