import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button color="secondary" aria-label="Example icon button with a home icon">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: []
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
