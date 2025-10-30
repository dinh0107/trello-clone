import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Board, Cards, List, User } from 'src/app/core/user';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  url = 'https://api.chunmedia.vn/api/'

  private listSubject = new BehaviorSubject<List[]>([])
  list$ = this.listSubject.asObservable()

  private listCardSubject = new BehaviorSubject<Map<number, Cards[]>>(new Map())
  card$ = this.listCardSubject.asObservable()

  constructor(private http: HttpClient) { }

  getJob(id: number | null): Observable<Board> {
    return this.http.get<Board>(`${this.url}boards/my/${id}`, { withCredentials: true })
  }


  getList(id: any): void {
    this.http.get<List[]>(`${this.url}lists/my/?boadId=${id}`, { withCredentials: true }).subscribe(res => this.listSubject.next(res))
  }

  addList(Title: string, BoardId: any): Observable<any> {
    const data = {
      Title: Title,
      BoardId: BoardId
    }
    return this.http.post(`${this.url}lists/create-list/`, data, { withCredentials: true })
  }

  changeTitle(id: any, title: string): Observable<any> {
    return this.http.put(`${this.url}lists/change-title/`, { title, id }, { withCredentials: true })
  }

  addToState(newList: List) {
    const current = this.listSubject.value
    this.listSubject.next([...current, newList])
  }
  changMove(body: any): Observable<any> {
    return this.http.put(`${this.url}lists/move/`, body, { withCredentials: true })
  }

  addCardToList(body: any): Observable<any> {
    return this.http.post(`${this.url}cards/add/`, body, { withCredentials: true })
  }
  getCardByList(id: number): Observable<Cards[]> {
    return this.http.get<Cards[]>(`${this.url}cards/list/${id}`, { withCredentials: true }).pipe(
      map(card => card.map(a => ({
        ...a, Id: a.Id, Title: a.Title, Sort: a.Sort, CardStatus: a.CardStatus
      }))), tap(cards => {
        const currentCard = new Map(this.listCardSubject.value);
        currentCard.set(id, cards);
        this.listCardSubject.next(currentCard);
      })
    )
  }
  addStateToCard(newCard: Cards, listId: number) {
    const currentCard = new Map(this.listCardSubject.value)
    const oldList = currentCard.get(listId) || [];
    const updatedList = [...oldList, newCard]
    currentCard.set(listId, updatedList)
    this.listCardSubject.next(currentCard)
  }

  moveCard(body: any): Observable<any> {
    return this.http.put(`${this.url}cards/move/`, body, { withCredentials: true })
  }

  viewCard(id: number): Observable<Cards> {
    return this.http.get<Cards>(`${this.url}cards/get-card/${id}`, { withCredentials: true })
  }

  getUserBoard(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}boards/${id}/members`, { withCredentials: true })
  }

  descriptionCard(data: any): Observable<any> {
    return this.http.put(`${this.url}cards/description-card`, data, { withCredentials: true })
  }
}
