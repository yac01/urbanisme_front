import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { BannerComponent } from './banner.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [BannerComponent],
  imports: [
CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
