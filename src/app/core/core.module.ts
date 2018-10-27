import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApolloConfigModule } from './../apollo-config.module';
import {MatToolbarModule, MatListModule} from '@angular/material';

import { AppRoutingModule } from './../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ApolloConfigModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {

    if (parentModule) {
      throw new Error('CoreModule já foi carregado, importe-o somente no AppModule!');
    }
  }
}
