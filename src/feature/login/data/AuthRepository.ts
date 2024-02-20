import {ResultModel} from "../../../infrastructure/result/model/ResultModel";

export interface AuthRepository {
  authLogin(email: string, password: string): Promise<ResultModel<string>>;

  getAuthToken(): ResultModel<Object>;
}
