import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  url = 'https://trello-api.chunmedia.vn/api/'
  constructor(private http: HttpClient) { }

  registerService(FullName: string, Phone: string, Email: string, UserName: string, Password: string): Observable<any> {
    const body = {
      fullName: FullName,
      phone: Phone,
      email: Email,
      userName: UserName,
      password: Password
    }
    return this.http.post(`${this.url}register`, { body }, { withCredentials: true })
  }

}
