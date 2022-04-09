import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('../applications/applications.module').then(
            (m) => m.ApplicationsModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
