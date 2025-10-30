import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Cards } from 'src/app/core/user';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cards
  ) {
  }

  isEditing = false
  isEditor = false


  toggleEditor() {
    this.isEditor = !this.isEditor
  }

  onEditorStatusChange(event: { visible: boolean, description?: string }) {
    this.isEditor = event.visible;
    if (event.description) {
      this.data.Description = event.description
    }
  }

  enableEdit() {
    this.isEditing = true
  }

  disableEdit() {
    this.isEditing = true
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
