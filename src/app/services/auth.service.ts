import { HttpService, HttpMethod } from '../shared/abstract/http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authenticatedUser: {access_token: string, refresh_token: string, authorities: string []};

    constructor(private http: HttpService, private router: Router) {

    }
    public login(username: string, password: string) {
        this.http.exchange('/jwt/generate', HttpMethod.POST, {body: {username, password}})
        .subscribe((res: any) => {
            this.authenticatedUser = {
                access_token: res.access_token,
                refresh_token: res.ref,
                authorities: []
            };
            this.router.navigate(['admin']);
        }, err => {
            console.log(err);
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
