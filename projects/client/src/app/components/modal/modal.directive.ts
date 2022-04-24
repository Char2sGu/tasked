import { Directive, Injectable, TemplateRef } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class ModalRef {
  constructor(private controller: ModalDirective) {}
  close(): void {
    this.controller.close();
  }
}

@Directive({
  selector: '[appModal]',
  exportAs: 'appModal',
  providers: [ModalRef],
})
export class ModalDirective {
  private sheetRef?: MatBottomSheetRef<never>;
  private dialogRef?: MatDialogRef<never>;

  constructor(
    private templateRef: TemplateRef<never>,
    private media: MediaObserver,
    private dialog: MatDialog,
    private sheet: MatBottomSheet,
  ) {}

  open(breakpoint = 'xs'): void {
    const isPhone = this.media.isActive(breakpoint);
    if (isPhone) this.openSheet();
    else this.openDialog();
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(this.templateRef);
  }

  openSheet(): void {
    this.sheetRef = this.sheet.open(this.templateRef);
  }

  close(): void {
    this.dialogRef?.close();
    this.sheetRef?.dismiss();
  }
}
