import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import { finalize, Observable } from "rxjs";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loading: LoadingService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loading.show();
        return next.handle(req).pipe(
            finalize(() => this.loading.hide())
        )
    }
}