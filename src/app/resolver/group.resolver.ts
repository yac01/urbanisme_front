import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService, HttpMethod } from '../shared/abstract/http.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GroupResolver implements Resolve<any> {
    constructor( private http: HttpService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.http.exchange('/urban/group/list/all', HttpMethod.GET, {});
    }

}
