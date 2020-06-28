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
        if (!req.url.includes('/jwt')) {
            let accessToken = null;
            if (this.authService.authenticatedUser) {
                accessToken = this.authService.authenticatedUser.access_token;
            }
            if (accessToken) {
                req = this.appendHeader(req, accessToken);
            } else {
                return this.router.navigate['login'];
            }
            return next.handle(req).pipe(
                catchError((err) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        // attempt to refresh the token
                        this.authService.refresh();
                        if (this.authService.authenticatedUser.access_token) {
                            req = this.appendHeader(req, this.authService.authenticatedUser.access_token);
                            return next.handle(req);
                        }
                    }
                    return EMPTY;
                })
            );
        }
        return next.handle(req).pipe(catchError(err => EMPTY));
    }

    private appendHeader(req: HttpRequest<any>, accessToken: string) {
        req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        return req;
    }
}
