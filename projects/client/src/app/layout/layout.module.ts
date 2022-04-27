import { LayoutModule as ResponsiveLayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../components/modal/modal.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { LayoutDirective } from './layout.directive';

// TODO: material style navigation drawer

@NgModule({
  declarations: [LayoutComponent, LayoutDirective, HeaderComponent],
  imports: [
    SharedModule,
    RouterModule,
    ResponsiveLayoutModule,
    OverlayModule,
    PortalModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    ModalModule,
  ],
  exports: [LayoutComponent, LayoutDirective, HeaderComponent],
})
export class LayoutModule {}
