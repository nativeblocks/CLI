import {gql} from "graphql-request";

export const AUTH_LOGIN_MUTATION = gql`
  mutation authLogin($email: String!, $password: String!) {
    authLogin(email: $email, password: $password) {
      id
      username
      email
      accessToken
      refreshToken
    }
  }
`;
