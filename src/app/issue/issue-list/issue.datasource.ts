import { AbstractDataSource } from 'src/app/shared/abstract/abstract-datasource';
import { MatPaginator } from '@angular/material';
import { HttpService, HttpMethod } from 'src/app/shared/abstract/http.service';

export class IssueDatasource extends AbstractDataSource<any> {
    constructor(paginator: MatPaginator, httpService: HttpService, body: any) {
        super(paginator, httpService, '/urban/issue/list', HttpMethod.POST, {body});
    }
}
