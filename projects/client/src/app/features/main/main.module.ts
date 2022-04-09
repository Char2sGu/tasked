import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { LayoutModule } from '../../components/layout/layout.module';
import { ProfileModule } from '../../components/profile/profile.module';
import { SharedModule } from '../../shared/shared.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainLayoutSidenavComponent } from './main-layout-sidenav/main-layout-sidenav.component';
import { MainLayoutSidenavRoomsComponent } from './main-layout-sidenav-rooms/main-layout-sidenav-rooms.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    MainLayoutSidenavComponent,
    MainLayoutSidenavRoomsComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    NgxSkeletonLoaderModule,
    LayoutModule,
    ProfileModule,
  ],
})
export class MainModule {}
