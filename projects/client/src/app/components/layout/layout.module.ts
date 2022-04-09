import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ContainerModule } from '../container/container.module';
import { LoadingModule } from '../loading/loading.module';
import { ProfileModule } from '../profile/profile.module';
import { LayoutComponent } from './layout/layout.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { RefetchButtonComponent } from './refetch-button/refetch-button.component';
import { ThemeButtonComponent } from './theme-button/theme-button.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    RefetchButtonComponent,
    ThemeButtonComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    OverlayModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    ProfileModule,
    LoadingModule,
    ContainerModule,
  ],
  exports: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    RefetchButtonComponent,
    ThemeButtonComponent,
  ],
})
export class LayoutModule {}
