import {gql} from "graphql-request";


export const INTEGRATIONS_QUERY = gql`
  query integrations(
    $organizationId: String!
    $public: Boolean!
    $kind: String!
    $platformSupport: String!
    $page: Int!
    $limit: Int!
    $orderBy: String!
    $sortOf: String!
  ) {
    integrations(
      organizationId: $organizationId
      public: $public
      kind: $kind
      platformSupport: $platformSupport
      page: $page
      limit: $limit
      orderBy: $orderBy
      sortOf: $sortOf
    ) {
      id
      keyType
      name
      version
      platformSupport
      kind
      public
    }
  }
`;
export const INTEGRATION_QUERY = gql`
  query integration($organizationId: String!, $integrationId: String!) {
    integration(
      organizationId: $organizationId
      integrationId: $integrationId
    ) {
      id
      keyType
      name
      imageIcon
      price
      version
      description
      platformSupport
      kind
      public
      documentation
      manageable
      properties {
        id
        key
        type
        value
        description
        valuePicker
        valuePickerCategory
        valuePickerGroup
        valuePickerOption
      }
      events {
        id
        event
      }
      data {
        id
        key
        value
        type
      }
    }
  }
`;
export const ADD_INTEGRATION_QUERY = gql`
mutation createIntegration($input: AddIntegrationInput!) {
    createIntegration(input: $input) {
      id
      keyType
      name
      imageIcon
      price
      version
      description
      platformSupport
      kind
      public
      documentation
    }
  }
`;

export const UPDATE_INTEGRATION_QUERY = gql`
mutation updateIntegration($input: UpdateIntegrationInput!) {
    updateIntegration(input: $input) {
      id
      keyType
      name
      imageIcon
      price
      version
      description
      platformSupport
      kind
      public
      documentation
    }
  }
`;
