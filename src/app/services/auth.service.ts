import { HttpService, HttpMethod } from '../shared/abstract/http.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends HttpService {
    authenticatedUser: {access_token: string, refresh_token: string, authorities: string []};

    public login(username: string, password: string) {
        this.exchange('/jwt/generate', HttpMethod.POST, {body: {username, password}})
        .subscribe((res: any) => {
            this.authenticatedUser = {
                access_token: res.access_token,
                refresh_token: res.ref,
                authorities: []
            };
        }, err => {
            console.log(err);
        });
    }
}
