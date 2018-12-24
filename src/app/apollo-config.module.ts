import { GRAPHCOOL_CONFIG, GraphcoolConfig } from './core/providers/graphcool-config.provider';
import { StorageKeys } from './storage-keys';
import { NgModule, Inject } from '@angular/core';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { onError } from 'apollo-link-error';
import { ApolloLink, Operation } from 'apollo-link';
import { persistCache } from 'apollo-cache-persist';
import { WebSocketLink } from 'apollo-link-ws';
import { getOperationAST } from 'graphql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class ApolloConfigModule {

  private subscriptionClient: SubscriptionClient;

  constructor(
    private apollo: Apollo,
    @Inject(GRAPHCOOL_CONFIG) private graphcoolConfig: GraphcoolConfig,
    private httpLink: HttpLink
  ) {
    const uri = this.graphcoolConfig.simpleAPI;
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

    const ws = new WebSocketLink({
      uri: this.graphcoolConfig.subscriptionsAPI,
      options: {
        reconnect: true,
        timeout: 30000, // especificar o tempo que deve aguardar para uma conexão ou reconexão
        connectionParams: () => ({'Authorization': `Bearer ${this.getAuthToken()}`})
        // envolve com parenteses pra indicar que é o próprio retorno
      }
    });

    this.subscriptionClient = (<any>ws).subscriptionClient;

    const cache = new InMemoryCache();

    persistCache({
      cache: cache,
      storage: window.localStorage
    }).catch (err => {
      console.log('Erro ao persistir o cache: ', err);
    });

    apollo.create({
      link: ApolloLink.from([
        linkError,
        ApolloLink.split(
          (operation: Operation) => {
            const operationAST = getOperationAST(operation.query, operation.operationName);
            return !!operationAST // truthy, falsy
              && operationAST.operation === 'subscription';
          },
          ws,
          authMiddleware.concat(http)
        )
      ]),
      cache: cache,
      connectToDevTools: !environment.production
    });
  }

  closeWebSocketConnection(): void {
    this.subscriptionClient.close(true, true);
  }

  private getAuthToken(): string {
    return window.localStorage.getItem(StorageKeys.AUTH_TOKEN);
  }
}
