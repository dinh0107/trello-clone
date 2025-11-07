import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Board, Cards, List, User } from 'src/app/core/user';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  url = 'https://api.chunmedia.vn/api/'

  private listSubject = new BehaviorSubject<List[]>([])
  list$ = this.listSubject.asObservable()

  cards = signal<Map<number, Cards[]>>(new Map)

  userByCards = signal<Map<number, User[]>>(new Map)


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
  
  getCardByList(id: number) {
    return this.http.get<Cards[]>(`${this.url}cards/list/${id}`, { withCredentials: true })
      .subscribe(cards => {
        const newMap = new Map(this.cards())
        newMap.set(id, cards)
        this.cards.set(newMap)
      })
  }


  getUserByCard(id: number): Observable<User[]> {
    return this.http.get<{Data: User[]}>(`${this.url}cards/${id}/users`, {withCredentials:true}).pipe(
      map(res => res.Data)
    )
  }

  setUserByCard(id : number, users: User[]) {
    const curent = this.userByCards();
    const updated = new Map(curent);
    updated.set(id, users);
    this.userByCards.set(updated);
  }

  appendUserToCard(id: number , user: User) {
    const curent = this.userByCards();
    const updated = new Map(curent);
    const userExiting = updated.get(id) || [];

    const exit = userExiting.find(a => a.Id === user.Id);
    if(!exit){
      updated.set(id , [...userExiting, user]);
      this.userByCards.set(updated);
    }
  }

  moveCard(body: any): Observable<any> {
    return this.http.put(`${this.url}cards/move/`, body, { withCredentials: true })
  }

  viewCard(id: number): Observable<Cards> {
    return this.http.get<Cards>(`${this.url}cards/get-card/${id}`, { withCredentials: true })
  }

  getUserBoard(id: number): Observable<User[]> {
    return this.http.get<any[]>(`${this.url}boards/${id}/members`, { withCredentials: true }).pipe(
      map(a => a.map(user => ({
        ...user,
        Id: user.UserId
      })))
    )
  }

  descriptionCard(data: any): Observable<any> {
    return this.http.put(`${this.url}cards/description-card`, data, { withCredentials: true })
  }

  deleteCad(id: number, listId: number): Observable<any> {
    return this.http.delete(`${this.url}cards/delete-card/${id}`, { withCredentials: true }).pipe(
      tap(() => {
        this.cards.update(prev => {
          const newMap = new Map(prev) || [];
          const list = newMap.get(listId) || []
          const filtered = list.filter(a => a.Id != id)
          newMap.set(listId, filtered)
          return newMap
        })
      })
    )
  }
  addUserToCard(body: any) {
    return this.http.post(`${this.url}cards/add-user`, body, { withCredentials: true }).pipe(
      map((res: any) => res.Data.User)
    )
  }
} 
