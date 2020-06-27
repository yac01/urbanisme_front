import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button color="secondary" aria-label="some icon">
        <mat-icon>menu</mat-icon>
      </button>
      <a mat-button  class="b-m-r" [routerLink]="['/admin']">Administration</a>
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
