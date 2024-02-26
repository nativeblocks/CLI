import {IntegrationRepository} from "./IntegrationRepository";
import {getGraphqlClient, handleNetworkError} from "../../../../infrastructure/network/NetworkComponent";
import {IntegrationModel} from "../model/integrationModel";
import {integrationToModel} from "../mapper/IntegrationMapper";
import {
  ADD_INTEGRATION_QUERY,
  INTEGRATION_QUERY,
  INTEGRATIONS_QUERY,
  SYNC_INTEGRATION_QUERY
} from "../query/IntegrationQuery";
import {ResultModel} from "../../../../infrastructure/result/model/ResultModel";

class IntegrationRepositoryImpl implements IntegrationRepository {

  private readonly graphqlClient: any;

  constructor(graphqlClient: any) {
    this.graphqlClient = graphqlClient;
  }

  async integrations(organizationId: string, isPublic: boolean, kind: string, platformSupport: string): Promise<ResultModel<IntegrationModel[]>> {
    try {
      const result = await this.graphqlClient.request(INTEGRATIONS_QUERY, {
        organizationId: organizationId,
        public: isPublic,
        kind: kind,
        platformSupport: platformSupport,
        page: 0,
        limit: 10000,
        orderBy: "createdAt",
        sortOf: "DESC",
      });
      return {
        onSuccess: result.integrations?.map((item: any) => {
          return integrationToModel(item)
        }) ?? []
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  async integration(organizationId: string, integrationId: string): Promise<ResultModel<IntegrationModel>> {
    try {
      const result = await this.graphqlClient.request(INTEGRATION_QUERY, {
        organizationId: organizationId,
        integrationId: integrationId,
      });
      return {
        onSuccess: integrationToModel(result.integration)
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  async add(body: {
    organizationId: string;
    platformSupport: string;
    public: boolean;
    price: number;
    kind: string;
    imageIcon: string;
    documentation: string;
    name: string;
    description: string;
    keyType: string
  }): Promise<ResultModel<IntegrationModel>> {
    if (!body.organizationId) return {
      onError: "The entered organizationId is not valid"
    }
    if (!body.name) return {
      onError: "The entered name is not valid"
    }
    if (!body.keyType) return {
      onError: "The entered keyType is not valid"
    }
    try {
      const result = await this.graphqlClient.request(ADD_INTEGRATION_QUERY, {input: body});
      return {
        onSuccess: integrationToModel(result.createIntegration)
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  async update(body: {
    id: string;
    organizationId: string;
    public: boolean;
    price: number;
    imageIcon: string;
    documentation: string;
    name: string;
    description: string
  }): Promise<ResultModel<string>> {
    if (!body.organizationId) return {
      onError: "The entered organizationId is not valid"
    }
    if (!body.id) return {
      onError: "The entered integrationId is not valid"
    }
    try {
      const result = await this.graphqlClient.request(SYNC_INTEGRATION_QUERY, {input: body});
      return {
        onSuccess: result.updateIntegration
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }
}

export const integrationRepository: IntegrationRepository = new IntegrationRepositoryImpl(
  getGraphqlClient()
);