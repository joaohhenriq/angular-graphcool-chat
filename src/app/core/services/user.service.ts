import { ALL_USERS_QUERY, AllUsersQuery } from './user.graphql';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo
  ) { }

  allUsers(): Observable<User[]> {
    return this.apollo
      .query<AllUsersQuery>({
        query: ALL_USERS_QUERY
      }).pipe(
        map(res => res.data.allUsers)
      );
  }
}
