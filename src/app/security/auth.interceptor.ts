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
<<<<<<< HEAD
        if (!req.url.includes('/jwt/generate') && !req.url.includes('/jwt/refresh')) {
=======
        if (!req.url.includes('/jwt')) {
>>>>>>> 276773b0762069e8fa2e13c8b789a0a1e7a77fae
            let accessToken = null;
            if (this.authService.authenticatedUser) {
                accessToken = this.authService.authenticatedUser.access_token;
            }
            if (accessToken) {
                req = this.appendHeader(req, accessToken);
            } else {
<<<<<<< HEAD
                // tslint:disable-next-line: no-unused-expression
                this.router.navigateByUrl('/login');
                return EMPTY;
=======
                return this.router.navigate['login'];
>>>>>>> 276773b0762069e8fa2e13c8b789a0a1e7a77fae
            }
            return next.handle(req).pipe(
                catchError((err) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
<<<<<<< HEAD
                        this.authService.refresh();
                        if (this.authService.authenticatedUser) {
                            this.appendHeader(req, this.authService.authenticatedUser.access_token);
                            return next.handle(req);
                        }
                    }
                    this.router.navigateByUrl('/login');
=======
                        // attempt to refresh the token
                        this.authService.refresh();
                        if (this.authService.authenticatedUser.access_token) {
                            req = this.appendHeader(req, this.authService.authenticatedUser.access_token);
                            return next.handle(req);
                        }
                    }
>>>>>>> 276773b0762069e8fa2e13c8b789a0a1e7a77fae
                    return EMPTY;
                })
            );
        }
<<<<<<< HEAD
        return next.handle(req);
    }
    private appendHeader(req: HttpRequest<any>, accessToken): HttpRequest<any> {
=======
        return next.handle(req).pipe(catchError(err => EMPTY));
    }

    private appendHeader(req: HttpRequest<any>, accessToken: string) {
>>>>>>> 276773b0762069e8fa2e13c8b789a0a1e7a77fae
        req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        return req;
    }
}
