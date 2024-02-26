import {AuthRepository} from "./AuthRepository";
import os from "os";
import path from "path";
import * as fs from "fs";
import {getGraphqlClient, handleNetworkError} from "../../../infrastructure/network/NetworkComponent";
import {AUTH_LOGIN_MUTATION} from "./AuthQuery";
import {ResultModel} from "../../../infrastructure/result/model/ResultModel";

class AuthRepositoryImpl implements AuthRepository {
  private userHomeDir: string = os.homedir();
  private credentialPath: string = path.join(this.userHomeDir, ".nativeblocks/cli/credential.json");
  private directory = path.dirname(this.credentialPath);

  private readonly graphqlClient: any;

  constructor(graphqlClient: any) {
    this.graphqlClient = graphqlClient;
  }

  async authLogin(email: string, password: string): Promise<ResultModel<string>> {
    try {
      const result = await this.graphqlClient.request(
        AUTH_LOGIN_MUTATION, {email: email, password: password},
      );
      if (result.authLogin.accessToken && result.authLogin.refreshToken) {
        if (!fs.existsSync(this.directory)) {
          fs.mkdirSync(this.directory, {recursive: true});
        }
        const json = {
          accessToken: result.authLogin.accessToken,
          refreshToken: result.authLogin.refreshToken
        }
        fs.writeFileSync(this.credentialPath, JSON.stringify(json))
      }
      return {
        onSuccess: "You are logged in"
      }
    } catch (error: any) {
      return {
        onError: handleNetworkError(error).errorMessage,
      }
    }
  }

  getAuthToken(): ResultModel<Object> {
    if (fs.existsSync(this.directory)) {
      try {
        const data: string = fs.readFileSync(this.directory, "utf-8");
        const json = JSON.parse(data)
        return {
          onSuccess: json
        }
      } catch (e) {
        return {
          onError: `regin could not retrieve ${e}`
        }
      }
    } else {
      return {
        onError: `File does not exist at ${this.directory}`
      }
    }
  }
}


export const authRepository: AuthRepository = new AuthRepositoryImpl(
  getGraphqlClient()
);