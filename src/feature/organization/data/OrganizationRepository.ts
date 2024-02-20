import {ResultModel} from "../../../infrastructure/result/model/ResultModel";
import {OrganizationModel} from "./OrganizationRepositoryImpl";

export interface OrganizationRepository {
  organizations(): Promise<ResultModel<OrganizationModel[]>>;
}
