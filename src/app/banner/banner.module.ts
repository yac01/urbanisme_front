import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BannerComponent } from './banner.component';

@NgModule({
  declarations: [BannerComponent],
  imports: [
  CommonModule,
    MatToolbarModule,
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
