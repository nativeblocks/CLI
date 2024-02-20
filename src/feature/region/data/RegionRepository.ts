import {ResultModel} from "../../../infrastructure/result/model/ResultModel";

export interface RegionRepository {
  set(url: string): ResultModel<string>

  get(): ResultModel<string>
}