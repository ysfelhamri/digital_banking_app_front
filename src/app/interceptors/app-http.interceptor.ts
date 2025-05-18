import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes("/auth/login")){
      let newRequest = request.clone({
        headers : request.headers.set('Authorization', 'Bearer '+this.authService.accessToken)
      })
      return next.handle(newRequest).pipe(
        catchError(err=>{
            if(err.status == 401){
              this.authService.logout()
            }
            return throwError(err.message)
          }
        )
      )
    }
    return next.handle(request)
  }
}
