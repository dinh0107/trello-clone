import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { BoadServiceService } from 'src/app/board/boadService.service';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SearchUserComponent implements OnDestroy {
  @Input() boardId: number = 0
  keyWords: string = ""
  users: User[] = []
  selectedUsers: User[] = []
  filteredUsers = this.users;
  showDropdown = false;
  private keyup$ = new Subject<string>();
  private destroy$ = new Subject<void>()


  constructor(private service: BoadServiceService, private cdr: ChangeDetectorRef) {
    this.keyup$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => this.getUser(value))
  }

  onkeyUp(value: string) {
    this.keyup$.next(value)
  }

  getUser(keyword: string) {
    if (!keyword.trim()) {
      this.users = [];
      this.showDropdown = false;
      this.cdr.markForCheck();
      return
    }
    this.service.getUser(keyword).subscribe({
      next: res => {
        this.users = res
        this.showDropdown = true;
        this.cdr.markForCheck()
      },
      error: () => {
        this.cdr.markForCheck();
      }
    })
  }
  selectUser(user: User) {
    if (!this.selectedUsers.find(u => u.Id === user.Id)) {
      this.selectedUsers.push(user);
    }
    this.keyWords = '';
    this.showDropdown = false;
    console.log(this.selectedUsers)
  }

  removeUser(user: any) {
    this.selectedUsers = this.selectedUsers.filter(u => u.Id !== user.Id);
  }


  submitUser() {
    this.service.addUserToBoard(this.boardId, this.selectedUsers.map(a => a.Id)).subscribe({
      next: () => {
        this.service.getUserBoard(this.boardId).subscribe()
      }
    })
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete()
  }
  trackById(index: number, item: any) {
    return item.id;
  }
}
