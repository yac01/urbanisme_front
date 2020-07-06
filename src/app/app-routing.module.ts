import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import {CreateUpdateUserComponent} from './admin/create-update-user/create-update-user.component';
import { GroupComponent } from './admin/group/group.component';
import { GroupResolver } from './resolver/group.resolver';
import { AdminGuard } from './security/admin.guard';
import { IssueCreateComponent } from './issue/issue-create/issue-create.component';

const routes: Routes = [
  {path: 'admin', canActivateChild: [AdminGuard], children : [
    {path: 'create', component: CreateUpdateUserComponent, resolve: {
      availableGroup: GroupResolver
    }},
    {path: 'user', component: AdminComponent},
    {path: 'group', component: GroupComponent},
    {path : '**', redirectTo: 'admin'}

  ]},
  {path: 'issues', children: [
    {path: 'create', component: IssueCreateComponent, resolve: {
      availableGroup: GroupResolver
    }
  }
  ]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
