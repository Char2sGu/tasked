import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../shared/shared.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [SharedModule, MatDialogModule, MatBottomSheetModule],
  exports: [ModalComponent],
})
export class ModalModule {}
