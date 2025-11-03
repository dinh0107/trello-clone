import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Cards, User } from 'src/app/core/user';
import { JobService } from 'src/app/jobs/service/job.service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {
  private _user: User[] = []
  users: User[] = [];
  keywords: string = '';
  search$ = new Subject<string>()

  constructor(
    public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cards, private service: JobService
  ) {
  }

  ngOnInit(): void {
    this.service.getUserBoard(this.data.boardId).subscribe({
      next: res => {
        this._user = res;
        this.users = res;
      }
    })
    this.search$.pipe(debounceTime(300), distinctUntilChanged()).subscribe(key => {
      const keywords = key.toLowerCase().trim();
      this.users = !keywords
        ? this._user
        : this.users.filter(a => a.FullName.toLowerCase().includes(keywords))
    })
  }
  isEditing = false
  isEditor = false



  filterUser(event: Event) {
    const input = (event?.target as HTMLInputElement).value;
    this.search$.next(input)
  }

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
