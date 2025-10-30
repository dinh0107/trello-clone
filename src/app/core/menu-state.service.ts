import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface MenuState {
  listId: number | null;
  cardId: number | null;
}
@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private openListIdSubject = new BehaviorSubject<number | null>(null);
  openListId$ = this.openListIdSubject.asObservable();

  openList(listId: number) {
    this.openListIdSubject.next(listId);
  }

  closeAll() {
    this.openListIdSubject.next(null);
  }

  get currentListId() {
    return this.openListIdSubject.value;
  }
}
