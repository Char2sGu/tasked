import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IllustrationComponent } from './illustration/illustration.component';
import { IllustrationPreloaderComponent } from './illustration-preloader/illustration-preloader.component';

@NgModule({
  declarations: [IllustrationPreloaderComponent, IllustrationComponent],
  imports: [CommonModule],
  exports: [IllustrationPreloaderComponent, IllustrationComponent],
})
export class IllustrationModule {}
