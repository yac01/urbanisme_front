import { AbstractDataSource } from './../shared/abstract/abstract-datasource';
import { MatPaginator } from '@angular/material';
import { HttpService, HttpMethod } from '../shared/abstract/http.service';

export class AdminDatasource extends AbstractDataSource<any> {
    constructor(paginator: MatPaginator, httpService: HttpService) {
        super(paginator, httpService, '/urban/user/list', HttpMethod.GET, {});
    }
}

