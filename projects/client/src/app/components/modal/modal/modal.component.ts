import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

/**
 * A wrapper of {@link MatDialog} and {@link MatBottomSheet}, which opens its
 * content as a dialog in desktop devices but a bottom sheet in mobile devices.
 *
 * **NOTE**: Providers like {@link MatDialogRef} and {@link MatBottomSheetRef}
 * are not available, inject {@link ModalComponent} instead.
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() closable = true;

  @ContentChild(TemplateRef) private contentTemplate!: TemplateRef<never>;
  private sheetRef?: MatBottomSheetRef<ModalComponent>;
  private dialogRef?: MatDialogRef<ModalComponent>;

  constructor(
    private media: MediaObserver,
    private dialog: MatDialog,
    private sheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {}

  open(breakpoint = 'xs'): void {
    const isPhone = this.media.isActive(breakpoint);
    if (isPhone) this.openSheet();
    else this.openDialog();
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(this.contentTemplate, {
      disableClose: !this.closable,
    });
  }

  openSheet(): void {
    this.sheetRef = this.sheet.open(this.contentTemplate, {
      disableClose: !this.closable,
    });
  }

  close(): void {
    this.dialogRef?.close();
    this.sheetRef?.dismiss();
  }
}
