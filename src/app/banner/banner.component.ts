import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button color="secondary" aria-label="some icon">
        <mat-icon>menu</mat-icon>
      </button>
      <button mat-button class="b-m-r" [matMenuTriggerFor]="adminMenu">Administration</button>
      <mat-menu #adminMenu="matMenu">
        <button mat-menu-item [routerLink]="['/admin/user']">Liste</button>
        <button mat-menu-item [routerLink]="['/admin/create']">Nouveau</button>
        <button mat-menu-item [routerLink]="['/admin/group']">Groupes</button>
      </mat-menu>
      <a mat-button  class="b-m-r" [routerLink]="['/issues']">Incidents</a>
    </mat-toolbar>
  `,
  styleUrls: ['./banner.component.css']

})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
