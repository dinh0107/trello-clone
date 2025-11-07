import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/core/user';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  url = 'https://api.chunmedia.vn/api/';

  // private authState = new BehaviorSubject<boolean | null>(null)
  isAuthenticated = signal<boolean | null>(null);
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  checkAuth(forceRefresh = false): Observable<boolean> {
    if (!forceRefresh && this.isAuthenticated() != null) {
      return of(this.isAuthenticated()!);
    }
    return this.http
      .get<{ isAuthenticated: boolean }>(`${this.url}auth/check-auth`, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => this.isAuthenticated.set(res.isAuthenticated)),
        map((res) => res.isAuthenticated),
        catchError(() => {
          this.isAuthenticated.set(false);
          return of(false);
        })
      );
  }

  registerService(
    fullName: string,
    phone: string,
    email: string,
    password: string
  ): Observable<any> {
    const body = {
      FullName: fullName,
      Phone: phone,
      Email: email,
      Password: password,
    };
    return this.http.post(`${this.url}auth/register`, body, {
      withCredentials: true,
    });
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      Email: email,
      Password: password,
    };
    return this.http.post(`${this.url}auth/login/`, body, {
      withCredentials: true,
    });
  }

  getInfoUser(): Observable<User> {
    return this.http.get<User>(`${this.url}account/me`, {
      withCredentials: true,
    });
  }

  setUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
  }

  getUser() {
    return (
      this.currentUserSubject.value ??
      JSON.parse(localStorage.getItem('user') || 'null')
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.url}auth/logout`,
      {},
      { withCredentials: true }
    );
  }

  refreshToken(): Observable<any> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.url}auth/refresh`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          if (res.accessToken) {
            this.checkAuth(true).subscribe();
          }
        }),
        catchError((err) => {
          console.error('Refresh token failed', err);
          this.isAuthenticated.set(false);
          this.removeUser();
          return of(null);
        })
      );
  }

  updateInfo(body: FormData): Observable<any> {
    return this.http.post(`${this.url}account/update-info`, body, {
      withCredentials: true,
    });
  }
}
