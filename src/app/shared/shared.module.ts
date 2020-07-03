import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatFormField, MatFormFieldModule, MatInputModule, MatIconModule, MatMenuModule, MatSelectModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ArrPipe } from './arr.pipe';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [ArrPipe, ConfirmationDialogComponent, LoadingComponent],
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
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    
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
    ArrPipe,
    ConfirmationDialogComponent,
    MatSnackBarModule,
    LoadingComponent
  ],
  entryComponents: [
    LoadingComponent
  ]
})
export class SharedModule { }
