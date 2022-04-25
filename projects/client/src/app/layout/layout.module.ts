import { LayoutModule as ResponsiveLayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { SidenavModule } from '../components/sidenav/sidenav.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutDirective } from './layout.directive';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent, LayoutDirective],
  imports: [
    SharedModule,
    RouterModule,
    OverlayModule,
    MatIconModule,
    MatToolbarModule,
    SidenavModule,
    MatButtonModule,
    ResponsiveLayoutModule,
  ],
  exports: [LayoutComponent, LayoutDirective],
})
export class LayoutModule {}
