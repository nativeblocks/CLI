import {ResultModel} from "../../../../infrastructure/result/model/ResultModel";
import {IntegrationModel} from "../model/integrationModel";

export interface IntegrationRepository {
  integrations(organizationId: string, kind: string, platformSupport: string): Promise<ResultModel<IntegrationModel[]>>;

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
  }): Promise<ResultModel<IntegrationModel>>;

  update(body: {
    id: string;
    organizationId: string;
    public: boolean;
    price: number;
    imageIcon: string;
    documentation: string;
    name: string;
    description: string;
  }): Promise<ResultModel<string>>;
}