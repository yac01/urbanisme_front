import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { IssueDatasource } from './issue.datasource';
import { HttpService } from 'src/app/shared/abstract/http.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  displayedColumns = ['author', 'title', 'created', 'modified', 'status', 'closed', 'edition'];
  dataSource: IssueDatasource;
  @ViewChild(MatPaginator) paginator;
  constructor(private http: HttpService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const body: any = {};
    body.authorName = this.auth.decoded.email;
    body.groups = this.auth.decoded.groups;
    this.dataSource = new IssueDatasource(this.paginator, this.http, body);
  }

  edit(){
   this.router.navigateByUrl("/issues/edit" );
  }

}
