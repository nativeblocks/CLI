import {GraphQLClient} from "graphql-request";
import {regionRepository} from "../../feature/region/data/RegionRepositoryImpl";
import fs from "fs";
import os from "os";
import path from "path";

let instance: GraphQLClient | null = null
export const getGraphqlClient = () => {
  if (instance == null) {
    instance = new GraphQLClient("", {
      headers: {
        authorization: `Bearer ${getAuthToken()}`,
      },
    })
    const endpoint = regionRepository.get()
    if (endpoint.onSuccess) {
      instance.setEndpoint(endpoint.onSuccess)
    }
    return instance
  }
}

function getAuthToken(): string {
  const userHomeDir: string = os.homedir();
  const credentialPath: string = path.join(userHomeDir, ".nativeblocks/cli/credential.json");
  const directory = path.dirname(credentialPath);
  if (fs.existsSync(directory)) {
    try {
      const data: string = fs.readFileSync(credentialPath, "utf-8");
      const json = JSON.parse(data)
      return json.accessToken
    } catch (e) {
      return ""
    }
  } else {
    return ""
  }
}