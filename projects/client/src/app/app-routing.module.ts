import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/teams/last',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    data: { animationState: 'auth' },
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./features/entry/entry.module').then((m) => m.EntryModule),
    canLoad: [AuthGuard],
    data: { animationState: 'entry' },
  },
  {
    path: '**',
    redirectTo: '/app/teams',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
