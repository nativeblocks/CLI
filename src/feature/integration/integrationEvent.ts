import { Command } from "commander";
import fs from "fs";
import { createDefaultDir } from "../../infrastructure/utility/FileUitl";
import { organizationRepository } from "../organization/data/OrganizationRepositoryImpl";
import { integrationMetaRepository } from "./data/repository/IntegrationMetaRepositoryImpl";

export function integrationEvent(program: Command) {
  return program
    .command("events")
    .description("List of events for an integration")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "Integration working directory")
    .argument("<organizationId>", "Organization id")
    .argument("<integrationId>", "Integration id")
    .argument("<directory>", "Integration working directory")
    .action(async (integrationId, directory) => {
      const organization = await organizationRepository.get();
      if (organization.onSuccess) {
        const result = await integrationMetaRepository.integrationEvents(organization.onSuccess, integrationId);
        if (result.onSuccess) {
          console.log("=========================================================================================");
          const path = createDefaultDir(directory);
          fs.writeFileSync(`${path}/events.json`, JSON.stringify(result.onSuccess));
          console.log(`The result saved into ${path}/events.json`);
          console.log("=========================================================================================");
        } else {
          console.log(result.onError);
        }
      } else {
        console.log(organization.onError);
      }
    });
}

export function syncIntegrationEvent(program: Command) {
  return program
    .command("sync")
    .description("Update the integration")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "Integration working directory")
    .argument("<integrationId>", "Integration id")
    .argument("<directory>", "Integration working directory")
    .action(async (integrationId, directory) => {
      const organization = await organizationRepository.get();
      if (organization.onSuccess) {
        try {
          const path = createDefaultDir(directory);
          const data: string = fs.readFileSync(`${path}/events.json`, "utf-8");
          const json = JSON.parse(data);
          const result = await integrationMetaRepository.syncIntegrationEvents(
            organization.onSuccess,
            integrationId,
            json
          );
          if (result.onSuccess) {
            console.log("=========================================================================================");
            fs.writeFileSync(`${path}/events.json`, JSON.stringify(result.onSuccess));
            console.log(`The result updated into ${path}/events.json`);
            console.log("=========================================================================================");
          } else {
            console.log(result.onError);
          }
        } catch (e) {
          console.log("Syncing information failed");
        }
      } else {
        console.log(organization.onError);
      }
    });
}
