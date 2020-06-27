import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken = null;
        if (this.authService.authenticatedUser) {
            accessToken = this.authService.authenticatedUser.access_token;
        }
        if (accessToken) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`
              }
            });
        }
        return next.handle(req).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    this.router.navigate(['login']);
                }
                return EMPTY;
            })
        );
    }
}
