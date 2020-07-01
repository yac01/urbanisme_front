import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatFormField, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
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
    MatIconModule
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
    ToastrModule
  ]
})
export class SharedModule { }
