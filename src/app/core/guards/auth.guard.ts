import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthApiService } from 'src/app/auth/service/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient, private authService: AuthApiService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.checkAuth().pipe(
      map(isAuth => isAuth ? true : this.router.createUrlTree(['/auth/login'])),
      catchError(() => of(this.router.createUrlTree(['/auth/login'])))
    )
  }
}
