import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from './../shared/shared.module';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { GroupComponent } from './group/group.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


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
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AdminModule { }
