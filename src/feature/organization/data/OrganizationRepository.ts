import {ResultModel} from "../../../infrastructure/result/model/ResultModel";
import {OrganizationModel} from "./OrganizationRepositoryImpl";

export interface OrganizationRepository {
  organizations(): Promise<ResultModel<OrganizationModel[]>>;
  set(id: string): Promise<ResultModel<string>>;
  get(): Promise<ResultModel<string>>;
}
