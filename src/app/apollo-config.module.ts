import { StorageKeys } from './storage-keys';
import { NgModule } from '@angular/core';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class ApolloConfigModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    const uri = 'https://api.graph.cool/simple/v1/cjniussik5sar0177vc58th1h';
    const http = httpLink.create({ uri });

    const authMiddleware: ApolloLink = new ApolloLink(
      (operation, forward) => {

        operation.setContext({
          headers: new HttpHeaders({
            'Authorization': `Bearer ${this.getAuthToken()}`
          })
        });

        return forward(operation);
      }
    );

    const linkError = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
          }
      if (networkError) {console.log(`[Network error]: ${networkError}`); }
    });

    apollo.create({
      link: ApolloLink.from([
        linkError,
        authMiddleware.concat(http)
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: !environment.production
    });
  }

  private getAuthToken(): string {
    return window.localStorage.getItem(StorageKeys.AUTH_TOKEN);
  }
}
