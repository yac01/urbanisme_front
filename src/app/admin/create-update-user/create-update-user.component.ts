import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.css']
})
export class CreateUpdateUserComponent implements OnInit {
  group: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this. group = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

}
