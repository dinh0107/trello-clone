import { Component, computed, OnInit } from '@angular/core';
import { JobService } from './service/job.service';
import { ActivatedRoute } from '@angular/router';
import { Board, List, User } from '../core/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../components/add-user/add-user.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  id: any;
  boad?: Board;
  users: User[] = [];
  lists: List[] = [];
  quickForm = false;
  addList: FormGroup;
  connectedLists: string[] = [];

  constructor(
    private service: JobService,
    private routre: ActivatedRoute,
    private fb: FormBuilder,
    private diaLog: MatDialog
  ) {
    this.addList = this.fb.group({
      Title: ['', Validators.required, Validators.length > 5],
    });
  }

  ngOnInit(): void {
    this.routre.paramMap.subscribe((params) => {
      if (params) {
        this.id = params.get('id');
      }
    });
    this.service.getJob(this.id).subscribe((data) => (this.boad = data));
    this.service.getList(this.id);
    this.service.list$.subscribe((res) => {
      this.lists = res;
      this.connectedLists = this.lists.map((a) => 'list-' + a.Id);
    });
    this.service.getUserBoard(this.id).subscribe({
      next: (users) => (this.users = users),
    });
  }
  submitList() {
    if (this.addList.invalid) return;
    this.service.addList(this.addList.value.Title, this.boad?.Id).subscribe({
      next: (res) => {
        this.service.addToState(res.List);
        this.addList.reset();
      },
    });
  }
  onEnter(listId: number) {
    console.log('Drag entered list:', listId);
  }

  onLeave(listId: number) {
    console.log('Drag left list:', listId);
  }

  closeForm() {
    this.quickForm = false;
    this.addList.reset();
  }
  closeFormList(list: any) {
    list.IsOpen = false;
    this.addList.reset();
  }

  changeNameList(event: FocusEvent, id: any, list: any) {
    const value = (event.target as HTMLInputElement).value;
    if (value == null) return;
    this.service.changeTitle(id, value).subscribe({
      next(res) {
        list.ShowInput = false;
      },
    });
  }
  dropList(event: CdkDragDrop<any[]>) {
    if (event.previousIndex == event.currentIndex) return;
    const draggerdList = this.lists[event.previousIndex];
    const targetList = this.lists[event.currentIndex];

    const newSort = event.currentIndex + 1;

    const body = {
      ListId: draggerdList.Id,
      NewSort: newSort,
      TargetListId: targetList.Id,
    };

    this.service.changMove(body).subscribe({
      next(value) {
        console.log(value);
      },
    });

    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }
  openPopUp() {
    if (this.diaLog.openDialogs.length === 0) {
      const diaLogRef = this.diaLog.open(AddUserComponent, {
        width: '720px',
        position: {
          top: '50px',
        },
        autoFocus: false,
        data: this.id,
      });
      diaLogRef.afterClosed().subscribe(() => {});
    }
  }
}
