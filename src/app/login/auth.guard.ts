import { Observable } from 'rxjs';
import { AuthService } from './../core/services/auth.service';
import { LoginRoutingModule } from './login-routing.module';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: LoginRoutingModule
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.checkAuthState()
      .pipe(
        take(1) // pega somente o primeiro valor emitido
      );
  }

  private checkAuthState(): Observable<boolean> {
    return this.authService.isAuthenticated
      .pipe(
        tap(is => {
          if (!is) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
}
