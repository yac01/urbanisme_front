import { AbstractDataSource } from '../../shared/abstract/abstract-datasource';
import { MatPaginator } from '@angular/material';
import { HttpService, HttpMethod } from 'src/app/shared/abstract/http.service';


export class GroupDatasource extends AbstractDataSource<any>{
    constructor(paginator: MatPaginator, httpService: HttpService) {
        super(paginator, httpService, '/urban/group/list', HttpMethod.GET, {});
    }
}
