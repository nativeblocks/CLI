import {Command} from "commander";
import fs from "fs";
import {createDefaultDir} from "../../infrastructure/utility/FileUitl";
import {integrationMetaRepository} from "./data/repository/IntegrationMetaRepositoryImpl";

export function integrationData(program: Command) {
  return program.command("data")
    .description("List of events for an integration")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "integration destination directory")
    .argument('<organizationId>', "organization id")
    .argument('<integrationId>', "integration id")
    .argument('<directory>', "integration destination directory")
    .action(async (organizationId, integrationId, directory) => {
      const result = await integrationMetaRepository.integrationData(
        organizationId, integrationId
      )
      if (result.onSuccess) {
        console.log("=========================================================================================")
        const path = createDefaultDir(directory)
        fs.writeFileSync(`${path}/data.json`, JSON.stringify(result.onSuccess))
        console.log(`The result saved into ${path}/data.json`)
        console.log("=========================================================================================")
      } else {
        console.log(result.onError)
      }
    });
}

export function syncIntegrationData(program: Command) {
  return program.command("sync")
    .description("Update the integration")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "integration destination directory")
    .argument('<organizationId>', "organization id")
    .argument('<integrationId>', "integration id")
    .argument('<directory>', "integration destination directory")
    .description("Update the integration")
    .action(async (organizationId, integrationId, directory) => {
      try {
        const path = createDefaultDir(directory)
        const data: string = fs.readFileSync(`${path}/data.json`, "utf-8");
        const json = JSON.parse(data)
        const result = await integrationMetaRepository.syncIntegrationData(
          organizationId, integrationId, json
        )
        if (result.onSuccess) {
          console.log("=========================================================================================")
          fs.writeFileSync(`${path}/data.json`, JSON.stringify(result.onSuccess))
          console.log(`The result updated into ${path}/data.json`)
          console.log("=========================================================================================")
        } else {
          console.log(result.onError)
        }
      } catch (e) {
        console.log("Syncing information failed")
      }
    });
}