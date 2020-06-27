import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

export enum HttpMethod {
    GET = 'GET', POST = 'POST'
}
export class HttpService {
    private regex = new RegExp('^.*[\{].*[\}].*');
    constructor(private http: HttpClient) {

    }

    public exchange(endpoint: string, method: HttpMethod, opts: {headers?: {name: string, value: string} [],
        body?: any,
        pathParams?: {name: string, value: string} [],
        reqParam?: {name: string, value: string} []}): Observable<any> | Observable<[]> {
        const headers = new HttpHeaders();
        if (method === HttpMethod.GET && opts.body) {
            throw new Error( 'Method get should not have a body');
        }

        if (opts.headers) {
            opts.headers.forEach(h => headers.append(h.name, h.value));
        } else {
            headers.append('Content-Type', 'application/json');
        }

        if (opts.pathParams && this.regex.test(endpoint)) {
            opts.pathParams.forEach(pp => {
                endpoint = endpoint.replace(`{${pp.name}}`, pp.value);
            });
        }

        if (opts.reqParam) {
            opts.reqParam.forEach((rp, index) => {
                if (index === 0) {
                    endpoint += `?${rp.name}=${rp.value}`;
                } else {
                    endpoint += `&${rp.name}=${rp.value}`;
                }
            });
        }
        if (method === HttpMethod.GET) {
            return this.http.get(endpoint, {headers});
        } else if (method === HttpMethod.POST) {
            return this.http.post(endpoint, opts.body, {headers});
        }
        throw new Error('Unsupported method');
    }
}
