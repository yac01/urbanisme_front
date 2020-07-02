import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/jwt/generate') && !req.url.includes('/jwt/refresh')) {
            let accessToken = null;
            if (this.authService.authenticatedUser) {
                accessToken = this.authService.authenticatedUser.access_token;
            }
            if (accessToken) {
                req = this.appendHeader(req, accessToken);
            } else {
                // tslint:disable-next-line: no-unused-expression
                this.router.navigateByUrl('/login').then(_res => this.toastr.warning('Vous devez être authentifié pour y accéder'));
                return EMPTY;
            }
            return next.handle(req).pipe(
                catchError((err) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        this.authService.refresh();
                        if (this.authService.authenticatedUser) {
                            this.appendHeader(req, this.authService.authenticatedUser.access_token);
                            return next.handle(req);
                        }
                        this.router.navigateByUrl('/login').then(_res => this.toastr.warning('Vous devez être authentifié pour y accéder'));
                    }
                    return EMPTY;
                })
            );
        }
        return next.handle(req);
    }
    private appendHeader(req: HttpRequest<any>, accessToken): HttpRequest<any> {
        req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        return req;
    }
}
