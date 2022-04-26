import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamCreationComponent } from './team-creation/team-creation.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamDetailAssignmentsComponent } from './team-detail-assignments/team-detail-assignments.component';
import { TeamDetailSettingsComponent } from './team-detail-settings/team-detail-settings.component';
import { TeamDetailTabRedirectorComponent } from './team-detail-tab-redirector/team-detail-tab-redirector.component';
import { TeamDetailTasksComponent } from './team-detail-tasks/team-detail-tasks.component';
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
            path: 'assignments',
            component: TeamDetailAssignmentsComponent,
          },
          {
            path: 'tasks',
            component: TeamDetailTasksComponent,
          },
          {
            path: 'settings',
            component: TeamDetailSettingsComponent,
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
