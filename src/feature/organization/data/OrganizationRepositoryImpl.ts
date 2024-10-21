import fs from "fs";
import os from "os";
import path from "path";
import { getGraphqlClient, handleNetworkError } from "../../../infrastructure/network/NetworkComponent";
import { ResultModel } from "../../../infrastructure/result/model/ResultModel";
import { GET_ORGANIZATIONS_QUERY } from "./OrganizationQuery";
import { OrganizationRepository } from "./OrganizationRepository";

export type OrganizationModel = {
  id: string;
  name: string;
};

class OrganizationRepositoryImpl implements OrganizationRepository {
  private readonly graphqlClient: any;

  private userHomeDir: string = os.homedir();
  private organizationPath: string = path.join(this.userHomeDir, ".nativeblocks/cli/organization.json");
  private directory = path.dirname(this.organizationPath);

  constructor(graphqlClient: any) {
    this.graphqlClient = graphqlClient;
  }

  async organizations(): Promise<ResultModel<OrganizationModel[]>> {
    try {
      const result = await this.graphqlClient.request(GET_ORGANIZATIONS_QUERY);
      return {
        onSuccess:
          result.organizations?.map((item: any) => {
            return { id: item?.id ?? "", name: item?.name ?? "" } as OrganizationModel;
          }) ?? [],
      };
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      };
    }
  }

  async set(id: string): Promise<ResultModel<string>> {
    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory, { recursive: true });
    }
    const json = {
      organizationId: id,
    };
    try {
      fs.writeFileSync(this.organizationPath, JSON.stringify(json));
      return {
        onSuccess: `organization saved to file successfully at ${this.organizationPath}`,
      };
    } catch (e) {
      return {
        onError: `organization could not save ${e}`,
      };
    }
  }

  async get(): Promise<ResultModel<string>> {
    if (fs.existsSync(this.organizationPath)) {
      try {
        const data: string = fs.readFileSync(this.organizationPath, "utf-8");
        const json = JSON.parse(data);
        return {
          onSuccess: json.organizationId,
        };
      } catch (e) {
        return {
          onError: `organization could not retrieve ${e}`,
        };
      }
    } else {
      return {
        onError: `organization could not retrieve from ${this.organizationPath}, please set the organization id`,
      };
    }
  }
}

export const organizationRepository: OrganizationRepository = new OrganizationRepositoryImpl(getGraphqlClient());
