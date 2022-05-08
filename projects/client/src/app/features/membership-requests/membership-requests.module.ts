import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ContainerModule } from '../../components/container/container.module';
import { EmptyStateModule } from '../../components/empty-state/empty-state.module';
import { IllustrationModule } from '../../components/illustration/illustration.module';
import { InfinityScrollModule } from '../../components/infinity-scroll/infinity-scroll.module';
import { UsernameModule } from '../../components/username/username.module';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { MembershipRequestListComponent } from './membership-request-list/membership-request-list.component';
import { MembershipRequestListItemComponent } from './membership-request-list-item/membership-request-list-item.component';
import { MembershipRequestsComponent } from './membership-requests.component';
import { MembershipRequestsRoutingModule } from './membership-requests-routing.module';

@NgModule({
  declarations: [
    MembershipRequestsComponent,
    MembershipRequestListComponent,
    MembershipRequestListItemComponent,
  ],
  imports: [
    SharedModule,
    MembershipRequestsRoutingModule,
    UsernameModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    NgxSkeletonLoaderModule,
    InfinityScrollModule,
    ContainerModule,
    EmptyStateModule,
    IllustrationModule,
    LayoutModule,
  ],
})
export class MembershipRequestsModule {}
