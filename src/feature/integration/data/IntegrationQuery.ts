import {gql} from "graphql-request";

export const GET_ORGANIZATIONS_QUERY = gql`
  query organizations {
    organizations {
      id
      name
      manageable
      seatCount
      contributors {
        id
        role
        user {
          id
          username
          email
        }
      }
    }
  }
`;