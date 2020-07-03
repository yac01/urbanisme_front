import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ConfrimatioDialogData {
  title?: string;
  ask: string;
  callback: () => void;
  context: any;
  args: {} [];
}
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfrimatioDialogData) {}

    public close() {
      this.dialogRef.close();
    }

    public actionWrapper() {
      this.data.callback.apply(this.data.context, this.data.args);
      this.dialogRef.close();
    }

}
