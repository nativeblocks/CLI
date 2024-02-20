import {ResultModel} from "../../../infrastructure/result/model/ResultModel";
import {OrganizationModel} from "./IntegrationRepositoryImpl";

export interface IntegrationRepository {
  organizations(): Promise<ResultModel<OrganizationModel[]>>;
}
