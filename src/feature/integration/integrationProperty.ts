import {Command} from "commander";
import fs from "fs";
import {createDefaultDir} from "../../infrastructure/utility/FileUitl";
import {integrationMetaRepository} from "./data/repository/IntegrationMetaRepositoryImpl";

export function integrationProperty(program: Command) {
  return program.command("properties")
    .description("List of events for an integration")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "integration destination directory")
    .argument('<organizationId>', "organization id")
    .argument('<integrationId>', "integration id")
    .argument('<directory>', "integration destination directory")
    .action(async (organizationId, integrationId, directory) => {
      const result = await integrationMetaRepository.integrationProperties(
        organizationId, integrationId
      )
      if (result.onSuccess) {
        console.log("=========================================================================================")
        const path = createDefaultDir(directory)
        fs.writeFileSync(`${path}/properties.json`, JSON.stringify(result.onSuccess))
        console.log(`The result saved into ${path}/properties.json`)
        console.log("=========================================================================================")
      } else {
        console.log(result.onError)
      }
    });
}

export function syncIntegrationProperty(program: Command) {
  return program.command("sync")
    .description("Update the integration")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "integration destination directory")
    .argument('<organizationId>', "organization id")
    .argument('<integrationId>', "integration id")
    .argument('<directory>', "integration destination directory")
    .action(async (organizationId, integrationId, directory) => {
      try {
        const path = createDefaultDir(directory)
        const data: string = fs.readFileSync(`${path}/properties.json`, "utf-8");
        const json = JSON.parse(data)
        const result = await integrationMetaRepository.syncIntegrationProperties(
          organizationId, integrationId, json
        )
        if (result.onSuccess) {
          console.log("=========================================================================================")
          fs.writeFileSync(`${path}/properties.json`, JSON.stringify(result.onSuccess))
          console.log(`The result updated into ${path}/properties.json`)
          console.log("=========================================================================================")
        } else {
          console.log(result.onError)
        }
      } catch (e) {
        console.log("Syncing information failed")
      }
    });
}