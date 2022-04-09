import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomCreationComponent } from './room-creation/room-creation.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomDetailAssignmentsComponent } from './room-detail-assignments/room-detail-assignments.component';
import { RoomDetailSettingsComponent } from './room-detail-settings/room-detail-settings.component';
import { RoomDetailTabRedirectorComponent } from './room-detail-tab-redirector/room-detail-tab-redirector.component';
import { RoomDetailTasksComponent } from './room-detail-tasks/room-detail-tasks.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomRedirectorComponent } from './room-redirector/room-redirector.component';
import { RoomsComponent } from './rooms.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    children: [
      {
        path: '',
        component: RoomListComponent,
      },
      {
        path: 'create',
        component: RoomCreationComponent,
      },
      {
        path: 'last',
        component: RoomRedirectorComponent,
      },
      {
        path: ':id',
        component: RoomDetailComponent,
        children: [
          {
            path: '',
            component: RoomDetailTabRedirectorComponent,
            pathMatch: 'exact',
          },
          {
            path: 'assignments',
            component: RoomDetailAssignmentsComponent,
          },
          {
            path: 'tasks',
            component: RoomDetailTasksComponent,
          },
          {
            path: 'settings',
            component: RoomDetailSettingsComponent,
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
export class RoomsRoutingModule {}
