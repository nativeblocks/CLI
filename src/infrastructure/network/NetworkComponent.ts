import {GraphQLClient} from "graphql-request";
import {regionRepository} from "../../feature/region/data/RegionRepositoryImpl";
import fs from "fs";
import os from "os";
import path from "path";

export function getGraphqlClient() {
  const endpoint = regionRepository.get()
  if (!endpoint.onSuccess) {
    console.error("Region url is not defined, please first set the region url.")
    return
  }
  return new GraphQLClient(endpoint.onSuccess, {
    headers: {
      authorization: `Bearer ${getAuthToken()}`,
    },
  })
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