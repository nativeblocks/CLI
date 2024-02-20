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

export const INTEGRATIONS_INSTALLED_QUERY = gql`
  query integrationsInstalled(
    $organizationId: String!
    $projectId: String!
    $kind: String!
  ) {
    integrationsInstalled(
      organizationId: $organizationId
      projectId: $projectId
      kind: $kind
    ) {
      id
      integrationKeyType
      integrationName
      integrationVersion
      integrationImageIcon
      integrationId
      projectId
      hasUpdate
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
export const CHECK_INTEGRATION_QUERY = gql`
  query integrationCheckInstallation(
    $organizationId: String!
    $projectId: String!
    $integrationId: String!
  ) {
    integrationCheckInstallation(
      organizationId: $organizationId
      projectId: $projectId
      integrationId: $integrationId
    ) {
      id
      integrationKeyType
      integrationName
      integrationVersion
      integrationId
      projectId
      hasUpdate
    }
  }
`;
export const UNINSTALL_INTEGRATION_MUTATION = gql`
  mutation unInstallIntegration($input: UnInstallIntegrationInput!) {
    unInstallIntegration(input: $input) {
      id
    }
  }
`;
export const INSTALL_INTEGRATION_MUTATION = gql`
  mutation installIntegration($input: InstallIntegrationInput!) {
    installIntegration(input: $input) {
      id
    }
  }
`;
export const UPGRADE_INTEGRATION_MUTATION = gql`
  mutation upgradeIntegration($input: UpgradeIntegrationInput!) {
    upgradeIntegration(input: $input) {
      id
    }
  }
`;
