import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { RefetchButtonModule } from '../../components/refetch-button/refetch-button.module';
import { ThemeButtonModule } from '../../components/theme-button/theme-button.module';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    SharedModule,
    MainRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
    LayoutModule,
    RefetchButtonModule,
    ThemeButtonModule,
  ],
})
export class MainModule {}
