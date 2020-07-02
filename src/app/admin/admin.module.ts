import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from './../shared/shared.module';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [AdminComponent, CreateUpdateUserComponent, GroupComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AdminComponent,
    CreateUpdateUserComponent,
    GroupComponent
  ]
})
export class AdminModule { }
