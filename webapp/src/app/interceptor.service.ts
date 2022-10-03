import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() {
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  decodeToken() {
    return localStorage.getItem('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    let headers = new HttpHeaders();

    const contentType = 'application/json';
    headers.set('Content-Type', contentType)

    const clone = req.clone({
      headers
    });

    return next.handle(clone)
      .pipe(
        map(event => {
          return event;
        }),
        retry(1),
        catchError(this.handleError)
      );
  }
}
