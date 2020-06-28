import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatCheckboxChange} from '@angular/material';
import { AdminDatasource } from './admin.datasource';
import { HttpService, HttpMethod } from '../shared/abstract/http.service';
import { AbstractDataSource } from './../shared/abstract/abstract-datasource';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  displayedColumns = ['username', 'email', 'group', 'administration', 'processing'];
  dataSource: AbstractDataSource<any>;

  @ViewChild(MatPaginator) paginator;
  constructor(private service: HttpService, private s: AuthService) {
  }

  ngOnInit() {
    this.dataSource = new AdminDatasource(this.paginator, this.service);
  }

  handlePermission(event: MatCheckboxChange, role: string, username: string) {
    const mode = event.checked ? 'ADD' : 'REM';
    this.service.exchange(`/urban/user/role/${mode}/{roleName}/{username}`,
    HttpMethod.PUT, {pathParams :  [{name: 'roleName', value: role}, {name: 'username', value: username}]}
    ).subscribe(() => console.log('done'));
  }
}


