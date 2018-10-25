import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private apiUrl = 'https://api.graph.cool/simple/v1/cjniussik5sar0177vc58th1h';
  constructor(
    private apollo: Apollo
  ) {
    this.allUser();
  }

  allUser(): void {
    this.apollo.query({
      query: gql`
        query {
          allUsers {
            id
            name
            email
          }
        }
      `
    }).subscribe(res => console.log('Query: ', res));
  }

  createUser(): void {
    const body = {
      query: `
        mutation CreateNewUser(
          $name: String!,
          $email: String!,
          $password: String!
        ) {
          createUser(name: $name, email: $email, password: $password) {
            id
            name
            email
          }
        }
      `,
      variables: {
        name: 'teste',
        email: 'teste@teste.com',
        password: '123456'
      }
    };

  }
}
