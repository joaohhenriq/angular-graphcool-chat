import { ALL_USERS_QUERY, AllUsersQuery } from './user.graphql';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo
  ) { }

  allUsers(idToExclude: string): Observable<User[]> {
    return this.apollo
      .query<AllUsersQuery>({
        query: ALL_USERS_QUERY,
        variables: {
          idToExclude
        }
      }).pipe(
        map(res => res.data.allUsers)
      );
  }
}
