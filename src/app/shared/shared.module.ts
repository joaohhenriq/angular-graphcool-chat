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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoRecordComponent } from './components/no-record/no-record.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FromNowPipe } from './pipes/from-now.pipe';

@NgModule({
  imports: [
    MatIconModule,
    CommonModule
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
    FormsModule,
    NoRecordComponent,
    AvatarComponent,
    FromNowPipe
  ],
  declarations: [NoRecordComponent, AvatarComponent, FromNowPipe]
})
export class SharedModule { }
