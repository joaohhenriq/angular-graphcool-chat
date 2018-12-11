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
import { NoRecordComponent } from './components/no-record/no-record.component';

@NgModule({
  imports: [
    MatIconModule
  ],
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
    MatSlideToggleModule,
    NoRecordComponent
  ],
  declarations: [NoRecordComponent]
})
export class SharedModule { }
