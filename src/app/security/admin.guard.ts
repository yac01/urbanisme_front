import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild  {
  constructor(private auth: AuthService, private toastr: ToastrService) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const admin = this.auth.isAdmin();
    if (admin) {
      return true;
    }
    this.toastr.warning('Vous n\'êtes pas autorisé à accéder à cette page');
    return false;
  }
}
