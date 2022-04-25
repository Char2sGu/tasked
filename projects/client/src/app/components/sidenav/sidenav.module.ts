import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from '../../shared/shared.module';
import { SidenavCloseOnNavigationDirective } from './sidenav-close-on-navigation.directive';

@NgModule({
  declarations: [SidenavCloseOnNavigationDirective],
  imports: [SharedModule],
  exports: [MatSidenavModule, SidenavCloseOnNavigationDirective],
})
export class SidenavModule {}
