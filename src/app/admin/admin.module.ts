import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from './../shared/shared.module';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';


@NgModule({
  declarations: [AdminComponent, CreateUpdateUserComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
