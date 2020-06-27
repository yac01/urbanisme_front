import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';


const data = [
  {username: 'username', email: 'Hydrogen', group: 1.0079, administration: false, processing: true},
];


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  displayedColumns = ['username', 'email', 'group', 'administration', 'processing'];
  dataSource = new MatTableDataSource(data);
  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


}


