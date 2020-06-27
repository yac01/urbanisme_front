import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { MatPaginator } from '@angular/material';
import {filter, startWith, switchMap, map} from 'rxjs/operators';
import { HttpService, HttpMethod } from './http.service';
export class AbstractDataSource<T> extends DataSource<T> {
    criteria = new BehaviorSubject(null);
    // tslint:disable-next-line: max-line-length
    constructor(private paginator: MatPaginator, private httpService: HttpService, private endpoint: string, private method: HttpMethod, private opts: {
        reqParams?: {name: string , value: string} [],
        pathParams?: {name: string , value: string} [],
        headers?: {name: string , value: string} []
    }) {
        super();
    }

    connect(collectionViewer: CollectionViewer): any | any [] {
        return merge(this.criteria, this.paginator.page).pipe(
            filter(v => v !== null),
            startWith([]),
            switchMap(() => {
                if (!this.opts.reqParams) {
                    this.opts.reqParams = [];
                }
                this.opts.reqParams.push({name: 'limit', value: this.paginator.pageSize.toString()});
                this.opts.reqParams.push({name: 'offset', value: this.paginator.pageIndex.toString()});
                return this.httpService.exchange(this.endpoint, this.method, this.opts);
            }),
            map(res => res)
        );
    }
    disconnect(collectionViewer: CollectionViewer): void {

    }

}
