import { ALL_USERS_QUERY, AllUsersQuery, UserQuery, GET_USER_BY_ID_QUERY, NEW_USERS_SUBSCRIPTION } from './user.graphql';
import { Apollo, QueryRef } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users$: Observable<User[]>;
  private queryRef: QueryRef<AllUsersQuery>;
  private userSubscription: Subscription;

  constructor(
    private apollo: Apollo
  ) { }

  startUsersMonitoring(idToExclude: string): void {
    if (!this.users$) {
      this.users$ = this.allUsers(idToExclude);
      this.userSubscription = this.users$.subscribe();
    }
  }

  stopUsersMonitoring(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      this.userSubscription = null;
      this.users$ = null;
    }
  }

  // idToExclude quer dizer que não precisamos monitorar o usuário logado,
  // não tem necessidade de aparecer seu usuário na lista de usuários
  allUsers(idToExclude: string): Observable<User[]> {
    this.queryRef = this.apollo
      .watchQuery<AllUsersQuery>({
        query: ALL_USERS_QUERY,
        variables: {
          idToExclude
        },
        fetchPolicy: 'network-only'
      });

    this.queryRef.subscribeToMore({
      document: NEW_USERS_SUBSCRIPTION,
      updateQuery: (previous: AllUsersQuery, { subscriptionData }): AllUsersQuery => {

        const newUser: User = subscriptionData.data.User.node;


        return {
          ...previous,
          allUsers: ([newUser, ...previous.allUsers]).sort((uA, uB) => {
            if (uA.name < uB.name) { return -1; }
            if (uA.name > uB.name) { return 1; }
            return 0;
          })
        };
      }
    });

    return this.queryRef.valueChanges
      .pipe(
        map(res => res.data.allUsers)
      );
  }

  getUserById(id: string): Observable<User> {
    return this.apollo
      .query<UserQuery>({
        query: GET_USER_BY_ID_QUERY,
        variables: {userId: id}
      }).pipe(
        map(res => res.data.User)
      );
  }
}
