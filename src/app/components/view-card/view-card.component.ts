import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Component, computed, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Cards, User } from 'src/app/core/user';
import { JobService } from 'src/app/jobs/service/job.service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss'],
})
export class ViewCardComponent implements OnInit {
  private _user: User[] = [];
  users: User[] = [];
  // userByCard: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cards,
    public service: JobService
  ) {}

  ngOnInit(): void {
    const cardId = Number(this.data.Id);

    this.service.getUserByCard(cardId).subscribe((user) => {
      this.service.setUserByCard(cardId, user);
    });
  }
  isEditing = false;
  isEditor = false;

  userOfCard = computed(() => {
    const cardId = Number(this.data.Id);
    return this.service.userByCards().get(cardId) || [];
  });

  toggleEditor() {
    this.isEditor = !this.isEditor;
  }

  onEditorStatusChange(event: { visible: boolean; description?: string }) {
    this.isEditor = event.visible;
    if (event.description) {
      this.data.Description = event.description;
    }
  }

  enableEdit() {
    this.isEditing = true;
  }

  disableEdit() {
    this.isEditing = true;
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
