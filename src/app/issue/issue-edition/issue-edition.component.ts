import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatPaginator } from '@angular/material';
//import { IssueDatasource } from './issue.datasource';
import { HttpService } from 'src/app/shared/abstract/http.service';
import { AuthService } from './../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-issue-edition',
  templateUrl: './issue-edition.component.html',
  styleUrls: ['./issue-edition.component.css']
})
export class IssueEditionComponent implements OnInit  {
    group: FormGroup;
    element : any;
   //dataSource: IssueDatasource;
    availableGroup: {name: string, description: string} [];
  constructor(private http: HttpService, private auth: AuthService, private router: Router, 
    private activatedRoute: ActivatedRoute, private fb: FormBuilder) {  
        this.element = this.router.getCurrentNavigation().extras.state.element;}

  ngOnInit() {
    this.availableGroup = this.activatedRoute.snapshot.data['availableGroup'];
    this.group = this.fb.group({
      title: new FormControl(this.element.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.element.description, [Validators.required, Validators.minLength(50), Validators.maxLength(400)]),
      groups: new FormControl(this.element.groups.map(x => x.name))
    });
   // this.dataSource = new IssueDatasource(this.paginator, this.http, body);
   
  }

  back() {
    this.router.navigateByUrl('issues/list');
  }

}