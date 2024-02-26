import {OrganizationRepository} from "./OrganizationRepository";
import {getGraphqlClient, handleNetworkError} from "../../../infrastructure/network/NetworkComponent";
import {GET_ORGANIZATIONS_QUERY} from "./OrganizationQuery";
import {ResultModel} from "../../../infrastructure/result/model/ResultModel";

export type OrganizationModel = {
  id: string;
  name: string;
};

class OrganizationRepositoryImpl implements OrganizationRepository {

  private readonly graphqlClient: any;

  constructor(graphqlClient: any) {
    this.graphqlClient = graphqlClient;
  }

  async organizations(): Promise<ResultModel<OrganizationModel[]>> {
    try {
      const result = await this.graphqlClient.request(GET_ORGANIZATIONS_QUERY);
      return {
        onSuccess: result.organizations?.map((item: any) => {
          return {id: item?.id ?? "", name: item?.name ?? ""} as OrganizationModel
        }) ?? []
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }
}

export const organizationRepository: OrganizationRepository = new OrganizationRepositoryImpl(
  getGraphqlClient()
);