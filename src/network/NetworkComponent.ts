import {GraphQLClient} from "graphql-request";

export function getGraphqlClient(endpoint: string) {
  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer MY_TOKEN`,
    },
  })
}