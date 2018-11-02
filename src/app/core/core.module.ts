import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApolloConfigModule } from './../apollo-config.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    ApolloConfigModule
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
