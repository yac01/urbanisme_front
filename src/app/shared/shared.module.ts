import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatFormField, MatFormFieldModule, MatInputModule, MatIconModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ArrPipe } from './arr.pipe';

@NgModule({
  declarations: [ArrPipe],
  imports: [

  CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    MatMenuModule,
    MatSelectModule,
    ArrPipe
  ]
})
export class SharedModule { }
