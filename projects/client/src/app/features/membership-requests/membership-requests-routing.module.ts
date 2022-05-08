import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembershipRequestsComponent } from './membership-requests.component';

const routes: Routes = [
  {
    path: '',
    component: MembershipRequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipRequestsRoutingModule {}
