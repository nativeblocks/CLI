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
      description
      platformSupport
      kind
      public
      documentation
    }
  }
`;
export const SYNC_INTEGRATION_QUERY = gql`
mutation updateIntegration($input: UpdateIntegrationInput!) {
    updateIntegration(input: $input) {
      id
      keyType
      name
      imageIcon
      price
      description
      platformSupport
      kind
      public
      documentation
    }
  }
`;
export const INTEGRATION_PROPERTIES_QUERY = gql`
  query integrationProperties($organizationId: String!, $integrationId: String!) {
    integrationProperties(
      organizationId: $organizationId
      integrationId: $integrationId
    ) {
      key
      value
      type
      description
      valuePicker
      valuePickerCategory
      valuePickerGroup
      valuePickerOption
    }
  }
`;
export const SYNC_INTEGRATION_PROPERTIES_MUTATION = gql`
  mutation syncIntegrationProperties($input: SyncIntegrationPropertiesInput!) {
    syncIntegrationProperties(input: $input) {
        key
        type
        value
        description
        valuePicker
        valuePickerCategory
        valuePickerGroup
        valuePickerOption
    }
  }
`;
export const INTEGRATION_EVENTS_QUERY = gql`
  query integrationEvents($organizationId: String!, $integrationId: String!) {
    integrationEvents(
      organizationId: $organizationId
      integrationId: $integrationId
    ) {
      event
    }
  }
`;
export const SYNC_INTEGRATION_EVENTS_MUTATION = gql`
  mutation syncIntegrationEvents($input: SyncIntegrationEventsInput!) {
    syncIntegrationEvents(input: $input) {
      event
    }
  }
`;
export const INTEGRATION_DATA_QUERY = gql`
  query integrationData($organizationId: String!, $integrationId: String!) {
    integrationData(
      organizationId: $organizationId
      integrationId: $integrationId
    ) {
      key
      type
    }
  }
`;
export const SYNC_INTEGRATION_DATA_MUTATION = gql`
  mutation syncIntegrationData($input: SyncIntegrationDataInput!) {
    syncIntegrationData(input: $input) {
      key
      type
    }
  }
`;