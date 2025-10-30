import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Background, Board, User } from '../core/user';

@Injectable({
  providedIn: 'root'
})
export class BoadServiceService {

  private boardSubject = new BehaviorSubject<Board[]>([])
  board$ = this.boardSubject.asObservable()


  private userSubject = new BehaviorSubject<User[]>([])
  user$ = this.userSubject.asObservable()


  url = 'https://api.chunmedia.vn/api/'

  constructor(private http: HttpClient) { }

  getBoard(): void {
    this.http.get<Board[]>(`${this.url}boards/my`, { withCredentials: true }).subscribe({
      next: data => {
        this.boardSubject.next(data);
      }
    })
  }

  getBackground(): Observable<any> {
    return this.http.get(`${this.url}boards/backgrounds`, { withCredentials: true })
  }

  createdBoard(name: string, BackgroundImage: string): Observable<any> {
    const body = {
      name, BackgroundImage
    }
    return this.http.post(`${this.url}boards/create`, body, { withCredentials: true });
  }

  addBoardToState(newBoard: Board) {
    const current = this.boardSubject.value;
    this.boardSubject.next([...current, newBoard])
  }

  getUser(keyWords: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}boards/search?keyword=${keyWords}`, { withCredentials: true })
  }
  addUserToBoard(BoardId: number, UserIds: any[]): Observable<any> {
    const body = {
      BoardId: BoardId,
      UserIds: UserIds
    }
    return this.http.post<any>(`${this.url}boards/add-user/`, body, { withCredentials: true }).pipe((
      tap((newUser) => {
        const current = this.userSubject.value
        this.userSubject.next([...current, newUser])
      })
    ))
  }

  getUserBoard(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}boards/${id}/members`, { withCredentials: true }).pipe(
      tap(res => this.userSubject.next(res))
    )
  }
} 
