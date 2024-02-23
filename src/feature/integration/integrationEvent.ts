import {Command} from "commander";
import fs from "fs";
import {createDefaultDir} from "../../infrastructure/utility/FileUitl";
import {integrationMetaRepository} from "./data/repository/IntegrationMetaRepositoryImpl";

export function integrationEvent(program: Command) {
  return program.command("events")
    .description("List of events for an integration")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "")
    .argument('<organizationId>', "id")
    .argument('<integrationId>', "platform")
    .action(async (organizationId, integrationId) => {
      const result = await integrationMetaRepository.integrationEvents(
        organizationId, integrationId
      )
      if (result.onSuccess) {
        console.log("=========================================================================================")
        const path = createDefaultDir()
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
    .option("-f, --file", "Integration file")
    .argument('<organizationId>', "organization id")
    .argument('<integrationId>', "integration id")
    .action(async (organizationId, integrationId) => {
      try {
        const path = createDefaultDir()
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
        console.log("Filling information interrupted")
      }
    });
}