import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject, merge } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

import { HttpMethod, HttpService } from './http.service';
import { HttpResponse } from '@angular/common/http';

export class AbstractDataSource<T> extends DataSource<T> {
    criteria = new BehaviorSubject(null);
    refresh = new BehaviorSubject(false);
    private paginationParamAppended = false;
    // tslint:disable-next-line: max-line-length
    constructor(private paginator: MatPaginator, private httpService: HttpService, private endpoint: string, private method: HttpMethod, private opts: {
        reqParams?: {name: string , value: string} [],
        pathParams?: {name: string , value: string} [],
        headers?: {name: string , value: string} [],
        body?: any
    }) {
        super();
        if (!this.opts.reqParams) {
            this.opts.reqParams = [];
        }
        this.opts.reqParams.push({name: 'limit', value: '0'});
        this.opts.reqParams.push({name: 'offset', value: '0'});

    }

    connect(collectionViewer: CollectionViewer): any | any [] {
        return merge(this.criteria, this.paginator.page, this.refresh).pipe(
            filter(v => v !== null),
            startWith([]),
            switchMap(() => {
                this.opts.reqParams.find(x => x.name === 'limit').value = this.paginator.pageSize.toString();
                this.opts.reqParams.find(x => x.name === 'offset').value = this.paginator.pageIndex.toString();
                return this.httpService.exchange(this.endpoint, this.method, this.opts, true);
            }),
            map((res: HttpResponse<any>) => {
                const totalCount = res.headers.get('X-TOTAL-COUNT');
                if (totalCount) {
                    this.paginator.length = Number.parseInt(totalCount, 10);
                }
                return res.body;
            })
        );
    }
    disconnect(collectionViewer: CollectionViewer): void {

    }

    public triggerRefresh() {
        this.refresh.next(true);
    }

}
