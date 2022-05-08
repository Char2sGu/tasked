import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryComponent } from './entry.component';

const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teams',
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('../teams/teams.module').then((m) => m.TeamsModule),
        data: { animationState: 'teams' },
      },
      {
        path: 'membership-requests',
        loadChildren: () =>
          import('../membership-requests/membership-requests.module').then(
            (m) => m.MembershipRequestsModule,
          ),
        data: { animationState: 'membership-requests' },
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then((m) => m.SettingsModule),
        data: { animationState: 'settings' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
