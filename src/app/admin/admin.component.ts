import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatCheckboxChange} from '@angular/material';
import { AdminDatasource } from './admin.datasource';
import { HttpService, HttpMethod } from '../shared/abstract/http.service';
import { AbstractDataSource } from './../shared/abstract/abstract-datasource';
import { AuthService } from './../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  displayedColumns = ['username', 'email', 'group', 'administration', 'processing', 'groups'];
  dataSource: AbstractDataSource<any>;

  @ViewChild(MatPaginator) paginator;
  constructor(private service: HttpService, private s: AuthService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.dataSource = new AdminDatasource(this.paginator, this.service);
  }

  handlePermission(event: MatCheckboxChange, role: string, username: string) {
    const mode = event.checked ? 'ADD' : 'REM';
    this.service.exchange(`/urban/user/role/{roleName}/{username}/${mode}`,
    HttpMethod.PUT, {pathParams :  [{name: 'roleName', value: role}, {name: 'username', value: username}]}
    ).subscribe(() => this.toastr.info(`Droits modifiés pour l'utilisateur '${username}'`)
    , err => this.toastr.error(`Droits non modifiés pour l'utilisateur '${username}'. Une erreur est survenue`));
  }
  hasPermission(element: any, permission: string): boolean {
    if (element.authorities && Array.isArray(element.authorities)) {
      return element.authorities.some(a => a.role === permission);
    }
    return false;
  }
}


