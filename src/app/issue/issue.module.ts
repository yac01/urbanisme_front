import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [IssueListComponent, IssueCreateComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    IssueCreateComponent
  ]
})
export class IssueModule { }
