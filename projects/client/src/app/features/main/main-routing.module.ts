import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { defineRouteAnimation, FADE_THROUGH } from '../../common/animations';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rooms',
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('../rooms/rooms.module').then((m) => m.RoomsModule),
        data: {},
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('../applications/applications.module').then(
            (m) => m.ApplicationsModule,
          ),
        data: { ...defineRouteAnimation(FADE_THROUGH) },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
