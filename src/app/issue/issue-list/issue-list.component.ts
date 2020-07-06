import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { IssueDatasource } from './issue.datasource';
import { HttpService } from 'src/app/shared/abstract/http.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  displayedColumns = ['author', 'title', 'created', 'modified', 'status', 'closed'];
  dataSource: IssueDatasource;
  @ViewChild(MatPaginator) paginator;
  constructor(private http: HttpService, private auth: AuthService) { }

  ngOnInit() {
    const body: any = {};
    body.authorName = this.auth.decoded.email;
    body.groups = this.auth.decoded.groups;
    this.dataSource = new IssueDatasource(this.paginator, this.http, body);
  }

}
