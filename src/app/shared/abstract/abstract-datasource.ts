import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject, merge } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

import { HttpMethod, HttpService } from './http.service';

export class AbstractDataSource<T> extends DataSource<T> {
    criteria = new BehaviorSubject(null);
    private paginationParamAppended = false;
    // tslint:disable-next-line: max-line-length
    constructor(private paginator: MatPaginator, private httpService: HttpService, private endpoint: string, private method: HttpMethod, private opts: {
        reqParams?: {name: string , value: string} [],
        pathParams?: {name: string , value: string} [],
        headers?: {name: string , value: string} []
    }) {
        super();
        if (!this.opts.reqParams) {
            this.opts.reqParams = [];
        }
        this.opts.reqParams.push({name: 'limit', value: '0'});
        this.opts.reqParams.push({name: 'offset', value: '0'});

    }

    connect(collectionViewer: CollectionViewer): any | any [] {
        return merge(this.criteria, this.paginator.page).pipe(
            filter(v => v !== null),
            startWith([]),
            switchMap(() => {
                this.opts.reqParams.find(x => x.name === 'limit').value = this.paginator.pageSize.toString();
                this.opts.reqParams.find(x => x.name === 'offset').value = this.paginator.pageIndex.toString();
                return this.httpService.exchange(this.endpoint, this.method, this.opts);
            }),
            map(res => res)
        );
    }
    disconnect(collectionViewer: CollectionViewer): void {

    }

}
