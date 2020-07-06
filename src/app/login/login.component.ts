import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  group: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isLogged) {
      this.router.navigateByUrl('/issues/list');
    }
    this.group = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    const username = this.group.controls.username.value;
    const password = this.group.controls.password.value;
    this.authService.login(username, password);
  }
}
