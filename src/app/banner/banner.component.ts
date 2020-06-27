import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
        <p>menu</p>
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
