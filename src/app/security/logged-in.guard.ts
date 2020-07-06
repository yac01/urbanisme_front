import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivateChild {
    constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if (!this.auth.isLogged()) {
            this.toastr.warning('Vous devez être authentifié pour accèder à cette ressource');
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }

}
