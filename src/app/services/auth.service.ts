import { HttpService, HttpMethod } from '../shared/abstract/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authenticatedUser: {access_token: string, refresh_token: string, authorities: string []};
    private _decoded;
    get decoded() {
        if (!this._decoded && this.authenticatedUser) {
            this._decoded = jwt_decode(this.authenticatedUser.access_token);
        }
        return this._decoded;
    }
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
            this._decoded = jwt_decode(this.authenticatedUser.access_token);
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

    isAdmin(): boolean {
        if (this.decoded) {
            const authorities = this.decoded.authorities;
            if (authorities) {
                return authorities.some(x => x === 'admin');
            }
        }
        return false;
    }
    isLogged(): boolean {
        return !!this.authenticatedUser;
    }
}
