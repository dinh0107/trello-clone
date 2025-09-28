import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from 'src/app/core/user';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  url = 'https://trello-api.chunmedia.vn/api/'

  private authState = new BehaviorSubject<boolean | null>(null)
  private currentUserSubject = new BehaviorSubject<any | null>(null)
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  checkAuth(): Observable<boolean> {
    if (this.authState.value !== null) {
      return of(this.authState.value);
    }
    return this.http.get<{ isAuthenticated: boolean }>(
      `${this.url}auth/check-auth`, { withCredentials: true }
    ).pipe(
      map(res => {
        this.authState.next(res.isAuthenticated);
        return res.isAuthenticated;
      }),
      catchError(() => {
        this.authState.next(false);
        return of(false);
      })
    );
  }

  registerService(fullName: string, phone: string, email: string, password: string): Observable<any> {
    const body = {
      FullName: fullName,
      Phone: phone,
      Email: email,
      Password: password
    }
    return this.http.post(`${this.url}auth/register`, body, { withCredentials: true })
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      Username: email,
      Password: password
    }
    return this.http.post(`${this.url}auth/login`, body, { withCredentials: true })
  }

  getInfoUser(): Observable<User> {
    return this.http.get<User>(`${this.url}account/me`, { withCredentials: true })
  }

  setUser(user: any) {
    this.currentUserSubject.next(user)
    localStorage.setItem('user', JSON.stringify(user))
  }
  getUser() {
    return this.currentUserSubject.value ?? JSON.parse(localStorage.getItem("user") || ("null"))
  }
}
