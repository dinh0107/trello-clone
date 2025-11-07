import { Component, OnInit, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { User } from 'src/app/core/user';
import { JobService } from 'src/app/jobs/service/job.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  private _user: User[] = [];
  users: User[] = [];
  @Input() boardId: number = 0;
  keywords: string = '';
  search$ = new Subject<string>();

  constructor(private service: JobService) {}
  ngOnInit(): void {
    this.service.getUserBoard(this.boardId).subscribe({
      next: (res) => {
        this._user = res;
        this.users = res;
      },
    });
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((key) => {
        const keywords = key.toLowerCase().trim();
        this.users = !keywords
          ? this._user
          : this.users.filter((a) =>
              a.FullName.toLowerCase().includes(keywords)
            );
      });
  }

  filterUser(event: Event) {
    const input = (event?.target as HTMLInputElement).value;
    this.search$.next(input);
  }
  addUserToCardFn(user: User) {
    const body = {
      CardId: this.boardId,
      UserId: user.Id,
    };
    this.service.addUserToCard(body).subscribe({
      next: (res) => {
        this.service.appendUserToCard(this.boardId, res);
      },
    });
  }
}
