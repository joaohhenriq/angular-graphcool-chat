import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
