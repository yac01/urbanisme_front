import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material';
import { AdminDatasource } from './admin.datasource';
import { HttpService, HttpMethod } from '../shared/abstract/http.service';
import { AbstractDataSource } from './../shared/abstract/abstract-datasource';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  displayedColumns = ['username', 'email', 'group', 'administration', 'processing'];
  dataSource: AbstractDataSource<any>;

  @ViewChild(MatPaginator) paginator;
  constructor(private service: HttpService) {
  }

  ngOnInit() {
    this.dataSource = new AdminDatasource(this.paginator, this.service);
  }

  handlePermission(role: string, username: string, val: boolean) {
    const mode = val ? 'ADD' : 'REM';
    this.service.exchange(`/urban/user/role/${mode}/{roleName}/{username}`,
    HttpMethod.PUT, {pathParams :  [{name: 'roleName', value: role}, {name: 'username', value: username}]}
    );
  }
}


