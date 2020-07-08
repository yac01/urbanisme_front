import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import {CreateUpdateUserComponent} from './admin/create-update-user/create-update-user.component';
import { GroupComponent } from './admin/group/group.component';
import { GroupResolver } from './resolver/group.resolver';
import { AdminGuard } from './security/admin.guard';
import { IssueCreateComponent } from './issue/issue-create/issue-create.component';
import { IssueListComponent } from './issue/issue-list/issue-list.component';
import { LoggedInGuard } from './security/logged-in.guard';
import { IssueEditionComponent } from './issue/issue-edition/issue-edition.component';

const routes: Routes = [
  {path: 'admin', canActivateChild: [AdminGuard, LoggedInGuard], children : [
    {path: 'create', component: CreateUpdateUserComponent, resolve: {
      availableGroup: GroupResolver
    }},
    {path: 'user', component: AdminComponent},
    {path: 'group', component: GroupComponent},
    {path : '**', redirectTo: 'admin'}

  ]},
  {path: 'issues', canActivateChild: [LoggedInGuard], children: [
    {path: 'create', component: IssueCreateComponent, resolve: {
      availableGroup: GroupResolver
    },
  },
  {path: 'edit', component : IssueEditionComponent},
  {path: 'list', component: IssueListComponent}
  ]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
