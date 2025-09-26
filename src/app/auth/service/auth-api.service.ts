import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  url = 'https://trello-api.chunmedia.vn/api/'

  private authState = new BehaviorSubject<boolean | null>(null)

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
      Email: email,
      Password: password
    }
    return this.http.post(`${this.url}auth/login`, body, { withCredentials: true })
  }
}
