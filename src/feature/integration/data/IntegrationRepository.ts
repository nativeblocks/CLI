import {ResultModel} from "../../../infrastructure/result/model/ResultModel";
import {IntegrationModel} from "./integrationModel";

export interface IntegrationRepository {
  integrations(organizationId: string, isPublic: boolean, kind: string, platformSupport: string): Promise<ResultModel<IntegrationModel[]>>;
}
