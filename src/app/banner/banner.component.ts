import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  template: `
    <mat-toolbar color="primary">
      <div class="full-width">
        <button *ngIf="auth.isAdmin()" mat-button class="b-m-r" [matMenuTriggerFor]="adminMenu">Administration</button>
        <mat-menu #adminMenu="matMenu">
          <button mat-menu-item [routerLink]="['/admin/user']">Liste</button>
          <button mat-menu-item [routerLink]="['/admin/create']">Nouveau</button>
          <button mat-menu-item [routerLink]="['/admin/group']">Groupes</button>
        </mat-menu>
        <a mat-button *ngIf="auth.isLogged()" class="b-m-r" [routerLink]="['/issues']">Incidents</a>

        <button *ngIf="auth.isLogged()" mat-icon-button [matMenuTriggerFor]="moreMenu" class="float-right">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #moreMenu="matMenu">
          <button mat-menu-item (click)="logout()">Se déconnecter</button>
        </mat-menu>

      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./banner.component.css']

})
export class BannerComponent {

  constructor(private auth: AuthService, private router: Router) { }

  logout() {
    this.auth.authenticatedUser = null;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
