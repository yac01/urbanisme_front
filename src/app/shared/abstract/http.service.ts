import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';

export enum HttpMethod {
    GET = 'GET', POST = 'POST', PUT = 'PUT'
}
@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private regex = new RegExp('^.*[\{].*[\}].*');
    constructor(private http: HttpClient) {

    }
    public exchange(endpoint: string, method: HttpMethod, opts: {headers?: {name: string, value: string} [],
          body?: any,
          pathParams?: {name: string, value: string} [],
          reqParams?: {name: string, value: string} []},
          response? : boolean): Observable<any> | Observable<[]> {
        let headers = new HttpHeaders();
        if (method === HttpMethod.GET && opts.body) {
            throw new Error( 'Method get should not have a body');
        }

        if (opts.headers) {
            opts.headers.forEach(h => headers.append(h.name, h.value));
        } else {
            headers = headers.append('Content-Type', 'application/json');
        }

        if (opts.pathParams && this.regex.test(endpoint)) {
            opts.pathParams.forEach(pp => {
                endpoint = endpoint.replace(`{${pp.name}}`, pp.value);
            });
        }

        if (opts.reqParams) {
            opts.reqParams.forEach((rp, index) => {
                if (index === 0) {
                    endpoint += `?${rp.name}=${rp.value}`;
                } else {
                    endpoint += `&${rp.name}=${rp.value}`;
                }
            });
        }
        if (method === HttpMethod.GET) {
            if (response) {
                return this.http.get(endpoint, {headers, observe: 'response'});
            } else {
                return this.http.get(endpoint, {headers, observe: 'body'});

            }

        } else if (method === HttpMethod.POST) {
            if (response) {
                return this.http.post(endpoint, opts.body, {headers, observe: 'response'});
            } else {
                return this.http.post(endpoint, opts.body, {headers, observe: 'body'});
            }
        } else if (method === HttpMethod.PUT) {
            return this.http.put(endpoint, opts.body, {headers});
        }
        throw new Error('Unsupported method');
    }
}
