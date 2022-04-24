import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../shared/shared.module';
import { ModalDirective } from './modal.directive';

@NgModule({
  declarations: [ModalDirective],
  imports: [SharedModule, MatDialogModule, MatBottomSheetModule],
  exports: [ModalDirective],
})
export class ModalModule {}
