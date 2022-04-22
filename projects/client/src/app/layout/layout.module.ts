import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ContainerModule } from '../components/container/container.module';
import { LoadingModule } from '../components/loading/loading.module';
import { ProfileModule } from '../components/profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    OverlayModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    ProfileModule,
    LoadingModule,
    ContainerModule,
  ],
  exports: [LayoutComponent, LayoutHeaderComponent, LayoutContentComponent],
})
export class LayoutModule {}
