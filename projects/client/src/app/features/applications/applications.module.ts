import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ContainerModule } from '../../components/container/container.module';
import { IllustrationsModule } from '../../components/illustrations/illustrations.module';
import { InfinityScrollModule } from '../../components/infinity-scroll/infinity-scroll.module';
import { UsernameModule } from '../../components/username/username.module';
import { SharedModule } from '../../shared/shared.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationListItemComponent } from './application-list-item/application-list-item.component';
import { ApplicationsComponent } from './applications.component';
import { ApplicationsRoutingModule } from './applications-routing.module';

@NgModule({
  declarations: [
    ApplicationsComponent,
    ApplicationListComponent,
    ApplicationListItemComponent,
  ],
  imports: [
    SharedModule,
    ApplicationsRoutingModule,
    UsernameModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    NgxSkeletonLoaderModule,
    InfinityScrollModule,
    ContainerModule,
    IllustrationsModule,
  ],
})
export class ApplicationsModule {}
