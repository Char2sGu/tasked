import { LayoutModule as ResponsiveLayoutModule } from '@angular/cdk/layout';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../components/modal/modal.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LayoutDirective } from './layout.directive';

@NgModule({
  declarations: [LayoutComponent, LayoutDirective],
  imports: [
    SharedModule,
    RouterModule,
    ResponsiveLayoutModule,
    PortalModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatDividerModule,
    ModalModule,
  ],
  exports: [LayoutComponent, LayoutDirective],
})
export class LayoutModule {}
