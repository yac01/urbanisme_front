import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { BannerComponent } from './banner.component';

@NgModule({
  declarations: [BannerComponent],
  imports: [
  CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
