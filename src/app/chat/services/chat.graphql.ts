import { Chat } from './../models/chat.model';
import gql from 'graphql-tag';

export interface AllChatsQuery {
  allChats: Chat[];
}

export const USER_CHATS_QUERY = gql`
  query UserChatsQuery($user_id: ID!){
    allChats(
      filter: {
        users_some: {
          id: $user_id
        }
      }
    ) {
      id
      title
      createdAt
      isGroup
      users(
        first: 1,
        filter: {
          id_not: $user_id
        }
      ) {
        id
        name
        email
        createdAt
      }
      messages(
        last: 1
      ) {
        id
        text
        sender {
          id
          name
        }
      }
    }
  }
`;
