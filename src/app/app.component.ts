import { AppConfigService } from './core/services/app-config.service';
import { AuthService } from './core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ErrorService } from './core/services/error.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet><router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private snackBar: MatSnackBar,
    private appConfig: AppConfigService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin()
      .pipe(take(1))
      .subscribe(
        null,
        error => {
          const message = this.errorService.getErrorMessage(error);
          this.snackBar.open(
            `Error: ${message}`,
            'Done',
            { duration: 5000, verticalPosition: 'top' }
          );
        }
      );
  }
}
