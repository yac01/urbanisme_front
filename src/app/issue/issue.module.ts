import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { SharedModule } from '../shared/shared.module';
import { IssueEditionComponent } from './issue-edition/issue-edition.component';

@NgModule({
  declarations: [IssueListComponent, IssueCreateComponent, IssueEditionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    IssueCreateComponent,
    IssueListComponent,
    IssueEditionComponent
  ]
})
export class IssueModule { }
