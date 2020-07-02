import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService, HttpMethod } from 'src/app/shared/abstract/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.css']
})
export class CreateUpdateUserComponent implements OnInit {
  group: FormGroup;
  hide = false;
  availableGroup: {name: string, description: string} [];

  constructor(private fb: FormBuilder, private router: Router,
              private http: HttpService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this. group = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      isAdmin: new FormControl(false),
      isEmployee: new FormControl(false),
      groups: new FormControl([])
    });
    this.availableGroup = this.activatedRoute.snapshot.data['availableGroup'];
  }
  public back() {
    this.router.navigateByUrl('/admin/user');
  }

  public create() {
    if (this.group.valid) {
      const data: any = {};
      data.username = this.group.controls['username'].value;
      data.password = this.group.controls['password'].value;
      data.email = this.group.controls['email'].value;
      data.admin = this.group.controls['isAdmin'].value;
      data.employee = this.group.controls['isEmployee'].value;
      data.groups = this.group.controls['groups'].value;
      this.http.exchange('/urban/user/create', HttpMethod.POST, {body: data}).subscribe(_data => {
        console.log('data!');
        this.router.navigateByUrl('/admin/user').then(x => 
          this.toastr.info(`User : ${data.username} created with success`));
      }, _err => {
        this.router.navigateByUrl('/admin/user').then(_x => this.toastr.error(`User : ${data.username} creation failed`));
      });
    }
  }
}
