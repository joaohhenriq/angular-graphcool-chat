import { AUTHENTICATE_USER_MUTATION } from './auth.graphql';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo
  ) {
    this.signinUser({email: 'angular@pop.com', password: '123456'})
      .subscribe(res => console.log('SignInUser', res));
  }

  signinUser(variables: {email: string, password: string}): Observable<{id: string, token: string}> {
    return this.apollo.mutate({
      mutation: AUTHENTICATE_USER_MUTATION,
      variables: variables
    }).pipe(
      map(res => res.data.authenticateUser)
    );
  }
}
