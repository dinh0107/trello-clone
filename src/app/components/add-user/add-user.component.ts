import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject, take, takeUntil } from 'rxjs';
import { BoadServiceService } from 'src/app/board/boadService.service';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit, OnDestroy {

  keyWords: any = '';
  users: User[] = [];
  private destroy$ = new Subject<void>();

  constructor(public diaLogRef: DialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: BoadServiceService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.service.getUserBoard(this.data).pipe(take(1)).subscribe({
      next: (users) => {
        this.users = users
        this.cdr.markForCheck()
      },
      error: (err) => console.error(err)
    })
    this.service.user$.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
      this.cdr.markForCheck()
    })
  }
  popUp = false

  enablePopUp() {
    this.popUp = true
  }
  disablePopUp() {
    this.popUp = false
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
