import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { HttpService, HttpMethod } from 'src/app/shared/abstract/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {
  group: FormGroup;
  availableGroup: {name: string, description: string} [];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
              private auth: AuthService, private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.availableGroup = this.activatedRoute.snapshot.data['availableGroup'];
    this.group = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(400)]),
      groups: new FormControl([])
    });
  }

  create() {
    const body: any = {};
    body.title = this.group.controls.title.value;
    body.content = this.group.controls.description.value;
    body.groups = this.group.controls.groups.value;
    body.authorName = this.auth.decoded.email;
    this.http.exchange('/urban/issue/create', HttpMethod.POST, {body})
    .subscribe(ok => {
      this.toastr.info('Incident créé avec succès');
      this.router.navigateByUrl('/admin');
    },
    err => this.toastr.error('Une erreur est survenue lors de la création de l\'incident'));
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

}
