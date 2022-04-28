import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, Injectable, TemplateRef } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first, map } from 'rxjs';

import { Breakpoint } from '../../common/breakpoint.enum';

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
  private isPhone$ = this.breakpointObserver
    .observe(Breakpoint.Small)
    .pipe(map((state) => !state.matches));

  constructor(
    private templateRef: TemplateRef<never>,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private sheet: MatBottomSheet,
  ) {}

  open(): void {
    this.isPhone$.pipe(first()).subscribe((isPhone) => {
      if (isPhone) this.openSheet();
      else this.openDialog();
    });
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
