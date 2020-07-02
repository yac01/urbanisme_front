import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService, HttpMethod } from 'src/app/shared/abstract/http.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractDataSource } from './../../shared/abstract/abstract-datasource';
import { MatPaginator } from '@angular/material';
import { GroupDatasource } from './group.datasource';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  formGroup: FormGroup;
  displayedColumns = ['id', 'desc', 'delete'];
  dataSource: AbstractDataSource<any>;

  @ViewChild(MatPaginator) paginator;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpService, private toastr: ToastrService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      group: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    this.dataSource = new GroupDatasource(this.paginator, this.http);
  }

  back() {
    this.router.navigateByUrl('/admin/user');
  }
  create() {
    const data: any = {};
    data.name = this.formGroup.controls.group.value;
    data.description = this.formGroup.controls.description.value;
    this.http.exchange('/urban/group/create', HttpMethod.POST, {body: data}).subscribe(() => {
      this.toastr.info(`le groupe'${data.name} a été créé avec succès'`);
      this.dataSource.triggerRefresh();
      this.formGroup.reset();
    }, err => this.toastr.error('Erreur lors de la création du groupe'));
  }

  public delete(name: string) {
    this.http.exchange('/urban/group/delete', HttpMethod.PUT, {reqParams : [{name: 'name', value: name}]}).subscribe(
      () => {
        this.toastr.info('Elément supprimé avec succès');
        this.dataSource.triggerRefresh();
      },
      () => this.toastr.error('Une erreur est surevenue lors de la suppression'));
  }

}
