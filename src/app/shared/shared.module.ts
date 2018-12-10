import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule,
         MatToolbarModule,
         MatProgressSpinnerModule,
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatSnackBarModule,
         MatSlideToggleModule,
         MatListModule,
         MatIconModule,
         MatLineModule,
         MatSidenavModule,
         MatTabsModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatLineModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ]
})
export class SharedModule { }
