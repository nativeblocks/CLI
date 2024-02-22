import {ResultModel} from "../../../infrastructure/result/model/ResultModel";
import {IntegrationModel} from "./integrationModel";

export interface IntegrationRepository {
  integrations(organizationId: string, isPublic: boolean, kind: string, platformSupport: string): Promise<ResultModel<IntegrationModel[]>>;

  integration(organizationId: string, integrationId: string): Promise<ResultModel<IntegrationModel>>;

  add(body: {
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
  }): Promise<ResultModel<string>>;
}