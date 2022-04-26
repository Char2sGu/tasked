import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './features/auth/auth.guard';

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
      import('./features/main/main.module').then((m) => m.MainModule),
    canLoad: [AuthGuard],
    data: { animationState: 'main' },
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
