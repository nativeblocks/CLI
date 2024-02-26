import {Command} from "commander";
import fs from "fs";
import {createDefaultDir} from "../../infrastructure/utility/FileUitl";
import {integrationMetaRepository} from "./data/repository/IntegrationMetaRepositoryImpl";

export function integrationEvent(program: Command) {
  return program.command("events")
    .description("List of events for an integration")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "Integration working directory")
    .argument('<organizationId>', "Organization id")
    .argument('<integrationId>', "Integration id")
    .argument('<directory>', "Integration working directory")
    .action(async (organizationId, integrationId, directory) => {
      const result = await integrationMetaRepository.integrationEvents(
        organizationId, integrationId
      )
      if (result.onSuccess) {
        console.log("=========================================================================================")
        const path = createDefaultDir(directory)
        fs.writeFileSync(`${path}/events.json`, JSON.stringify(result.onSuccess))
        console.log(`The result saved into ${path}/events.json`)
        console.log("=========================================================================================")
      } else {
        console.log(result.onError)
      }
    });
}

export function syncIntegrationEvent(program: Command) {
  return program.command("sync")
    .description("Update the integration")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "Integration working directory")
    .argument('<organizationId>', "Organization id")
    .argument('<integrationId>', "Integration id")
    .argument('<directory>', "Integration working directory")
    .action(async (organizationId, integrationId, directory) => {
      try {
        const path = createDefaultDir(directory)
        const data: string = fs.readFileSync(`${path}/events.json`, "utf-8");
        const json = JSON.parse(data)
        const result = await integrationMetaRepository.syncIntegrationEvents(
          organizationId, integrationId, json
        )
        if (result.onSuccess) {
          console.log("=========================================================================================")
          fs.writeFileSync(`${path}/events.json`, JSON.stringify(result.onSuccess))
          console.log(`The result updated into ${path}/events.json`)
          console.log("=========================================================================================")
        } else {
          console.log(result.onError)
        }
      } catch (e) {
        console.log("Syncing information failed")
      }
    });
}