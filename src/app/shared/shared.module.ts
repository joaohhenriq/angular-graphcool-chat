import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule,
         MatToolbarModule,
         MatProgressSpinnerModule,
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
