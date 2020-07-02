import { HttpService, HttpMethod } from '../shared/abstract/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authenticatedUser: {access_token: string, refresh_token: string, authorities: string []};
    constructor(private http: HttpService, private router: Router, private toastr: ToastrService) {
        const authAsString = localStorage.getItem('auth');
        if (authAsString) {
            this.authenticatedUser = JSON.parse(authAsString);
        }
    }
    public login(username: string, password: string) {
        this.http.exchange('/jwt/generate', HttpMethod.POST, {body: {username, password}})
        .subscribe((res: any) => {
            this.authenticatedUser = {
                access_token: res.access_token,
                refresh_token: res.refresh_token,
                authorities: []
            };
            localStorage.setItem('auth', JSON.stringify(this.authenticatedUser));
            this.router.navigateByUrl('/admin/user');
        }, err => {
            if (err.status === 401) {
                this.toastr.error(`erreur d'autentification. identifiant mot de passe incorrect`);
            } else if (err.status >= 500) {
                this.toastr.warning(`Erreur interne, application indisponible. réessayer ultérieurement`);
            }
        });
    }


    public refresh() {
        this.http.exchange('/jwt/refresh', HttpMethod.POST,
        {reqParams: [{name: 'refresh_token', value: this.authenticatedUser.refresh_token}]})
        .subscribe(res => {
            this.authenticatedUser = {
                access_token: res.access_token,
                refresh_token: res.ref,
                authorities: []
            };
        });
    }
}
