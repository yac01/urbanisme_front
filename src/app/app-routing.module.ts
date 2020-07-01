import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import {CreateUpdateUserComponent} from './admin/create-update-user/create-update-user.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, children : [
    {path: 'create', component: CreateUpdateUserComponent}
  ]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
