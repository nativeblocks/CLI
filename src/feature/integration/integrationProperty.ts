import { Command } from "commander";
import fs from "fs";
import { createDefaultDir } from "../../infrastructure/utility/FileUitl";
import { organizationRepository } from "../organization/data/OrganizationRepositoryImpl";
import { integrationMetaRepository } from "./data/repository/IntegrationMetaRepositoryImpl";

export function integrationProperty(program: Command) {
  return program
    .command("properties")
    .description("List of events for an integration")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "Integration working directory")
    .argument("<integrationId>", "Integration id")
    .argument("<directory>", "Integration working directory")
    .action(async (integrationId, directory) => {
      const organization = await organizationRepository.get();
      if (organization.onSuccess) {
        const result = await integrationMetaRepository.integrationProperties(organization.onSuccess, integrationId);
        if (result.onSuccess) {
          console.log("=========================================================================================");
          const path = createDefaultDir(directory);
          fs.writeFileSync(`${path}/properties.json`, JSON.stringify(result.onSuccess));
          console.log(`The result saved into ${path}/properties.json`);
          console.log("=========================================================================================");
        } else {
          console.log(result.onError);
        }
      } else {
        console.log(organization.onError);
      }
    });
}

export function syncIntegrationProperty(program: Command) {
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
          const data: string = fs.readFileSync(`${path}/properties.json`, "utf-8");
          const json = JSON.parse(data);
          const result = await integrationMetaRepository.syncIntegrationProperties(
            organization.onSuccess,
            integrationId,
            json
          );
          if (result.onSuccess) {
            console.log("=========================================================================================");
            fs.writeFileSync(`${path}/properties.json`, JSON.stringify(result.onSuccess));
            console.log(`The result updated into ${path}/properties.json`);
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
