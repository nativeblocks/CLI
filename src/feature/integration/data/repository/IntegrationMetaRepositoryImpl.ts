import {ResultModel} from "../../../../infrastructure/result/model/ResultModel";
import {IntegrationMetaRepository} from "./IntegrationMetaRepository";
import {IntegrationDataModel, IntegrationEventModel, IntegrationPropertyModel} from "../model/integrationModel";
import {getGraphqlClient, handleNetworkError} from "../../../../infrastructure/network/NetworkComponent";
import {
  INTEGRATION_DATA_QUERY,
  INTEGRATION_EVENTS_QUERY,
  INTEGRATION_PROPERTIES_QUERY,
  SYNC_INTEGRATION_DATA_MUTATION,
  SYNC_INTEGRATION_EVENTS_MUTATION,
  SYNC_INTEGRATION_PROPERTIES_MUTATION
} from "../query/IntegrationQuery";
import {integrationDataToModel, integrationEventToModel, integrationPropertyToModel} from "../mapper/IntegrationMapper";

export class IntegrationMetaRepositoryImpl implements IntegrationMetaRepository {

  private readonly graphqlClient: any;

  constructor(graphqlClient: any) {
    this.graphqlClient = graphqlClient;
  }

  async integrationProperties(organizationId: string, integrationId: string): Promise<ResultModel<IntegrationPropertyModel[]>> {
    try {
      const result = await this.graphqlClient.request(INTEGRATION_PROPERTIES_QUERY, {
        organizationId: organizationId,
        integrationId: integrationId,
      });
      return {
        onSuccess: result.integrationProperties?.map((item: any) => {
          return integrationPropertyToModel(item)
        })
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  async syncIntegrationProperties(organizationId: string, integrationId: string, payload: any): Promise<ResultModel<IntegrationPropertyModel[]>> {
    try {
      const result = await this.graphqlClient.request(SYNC_INTEGRATION_PROPERTIES_MUTATION, {
        input: {
          organizationId: organizationId,
          integrationId: integrationId,
          properties: payload
        }
      });
      return {
        onSuccess: result.syncIntegrationProperties?.map((item: any) => {
          return integrationPropertyToModel(item)
        })
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  async integrationEvents(organizationId: string, integrationId: string): Promise<ResultModel<IntegrationEventModel[]>> {
    try {
      const result = await this.graphqlClient.request(INTEGRATION_EVENTS_QUERY, {
        organizationId: organizationId,
        integrationId: integrationId,
      });
      return {
        onSuccess: result.integrationEvents?.map((item: any) => {
          return integrationEventToModel(item)
        })
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  async syncIntegrationEvents(organizationId: string, integrationId: string, payload: any): Promise<ResultModel<IntegrationEventModel[]>> {
    try {
      const result = await this.graphqlClient.request(SYNC_INTEGRATION_EVENTS_MUTATION, {
        input: {
          integrationId: integrationId,
          organizationId: organizationId,
          events: payload
        }
      });
      return {
        onSuccess: result.syncIntegrationEvents?.map((item: any) => {
          return integrationEventToModel(item)
        })
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  async integrationData(organizationId: string, integrationId: string): Promise<ResultModel<IntegrationDataModel[]>> {
    try {
      const result = await this.graphqlClient.request(INTEGRATION_DATA_QUERY, {
        organizationId: organizationId,
        integrationId: integrationId,
      });
      return {
        onSuccess: result.integrationData?.map((item: any) => {
          return integrationDataToModel(item)
        })
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  async syncIntegrationData(organizationId: string, integrationId: string, payload: any): Promise<ResultModel<IntegrationDataModel[]>> {
    try {
      const result = await this.graphqlClient.request(SYNC_INTEGRATION_DATA_MUTATION, {
        input: {
          organizationId: organizationId,
          integrationId: integrationId,
          data: payload
        }
      });
      return {
        onSuccess: result.syncIntegrationData?.map((item: any) => {
          return integrationDataToModel(item)
        })
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

}

export const integrationMetaRepository: IntegrationMetaRepository = new IntegrationMetaRepositoryImpl(
  getGraphqlClient()
);