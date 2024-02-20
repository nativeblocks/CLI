import {IntegrationRepository} from "./IntegrationRepository";
import {ResultModel} from "../../../infrastructure/result/model/ResultModel";
import {getGraphqlClient} from "../../../infrastructure/network/NetworkComponent";
import {IntegrationModel} from "./integrationModel";
import {integrationToModel} from "./IntegrationMapper";
import {INTEGRATIONS_QUERY} from "./IntegrationQuery";

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
        onError: error.message,
      }
    }
  }
}


export const integrationRepository: IntegrationRepository = new IntegrationRepositoryImpl(
  getGraphqlClient()
);