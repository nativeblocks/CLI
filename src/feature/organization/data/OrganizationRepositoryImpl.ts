import {OrganizationRepository} from "./OrganizationRepository";
import {ResultModel} from "../../../infrastructure/result/model/ResultModel";
import os from "os";
import path from "path";
import {getGraphqlClient} from "../../../infrastructure/network/NetworkComponent";
import {GET_ORGANIZATIONS_QUERY} from "./OrganizationQuery";

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
          return {
            id: item?.id ?? "",
            name: item?.name ?? "",
          } as OrganizationModel
        }) ?? []
      }
    } catch (error: any) {
      return {
        onError: error.message,
      }
    }
  }
}


export const organizationRepository: OrganizationRepository = new OrganizationRepositoryImpl(
  getGraphqlClient()
);