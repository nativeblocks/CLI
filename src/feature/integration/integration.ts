import { input, select } from "@inquirer/prompts";
import { Command } from "commander";
import fs from "fs";
import { createDefaultDir } from "../../infrastructure/utility/FileUitl";
import { organizationRepository } from "../organization/data/OrganizationRepositoryImpl";
import { integrationRepository } from "./data/repository/IntegrationRepositoryImpl";

export function integrations(program: Command) {
  return program
    .command("list")
    .description("List of integrations for an organization")
    .option("-p, --platform", "Platform of integration, ANDROID, IOS, REACT")
    .option("-k, --kind", "Kind of integration, BLOCK, ACTION, LOGGER or ALL")
    .argument("<platform>", "platform")
    .argument("[kind]", "kind", "ALL")
    .action(async (platform, kind) => {
      const organization = await organizationRepository.get();
      if (organization.onSuccess) {
        const result = await integrationRepository.integrations(organization.onSuccess, kind, platform);
        if (result.onSuccess) {
          console.table(result.onSuccess, ["id", "name", "keyType", "kind", "platformSupport", "public"]);
        } else {
          console.log(result.onError);
        }
      } else {
        console.log(organization.onError);
      }
    });
}

export function integration(program: Command) {
  return program
    .command("integration")
    .description("The integration detail")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "Integration working directory")
    .argument("<integrationId>", "Integration id")
    .argument("<directory>", "Integration working directory")
    .action(async (integrationId, directory) => {
      const organization = await organizationRepository.get();
      if (organization.onSuccess) {
        const result = await integrationRepository.integration(organization.onSuccess, integrationId);
        if (result.onSuccess) {
          const allowed = [
            "name",
            "keyType",
            "imageIcon",
            "price",
            "description",
            "documentation",
            "platformSupport",
            "kind",
            "public",
          ];
          const filtered = Object.fromEntries(
            Object.entries(result.onSuccess).filter(([key, val]) => allowed.includes(key))
          );
          console.log("=========================================================================================");
          const path = createDefaultDir(directory);
          fs.writeFileSync(`${path}/integration.json`, JSON.stringify(filtered));
          console.log(`The result saved into ${path}/integration.json`);
          console.log("=========================================================================================");
        } else {
          console.log(result.onError);
        }
      } else {
        console.log(organization.onError);
      }
    });
}

export function addIntegration(program: Command) {
  return program
    .command("add")
    .description("Add a new integration")
    .action(async () => {
      const organization = await organizationRepository.get();
      if (organization.onSuccess) {
        try {
          const body = {
            organizationId: organization.onSuccess,
            keyType: "",
            name: "",
            imageIcon: "",
            price: 0,
            description: "",
            documentation: "",
            platformSupport: "",
            public: false,
            kind: "",
          };
          body.keyType = await input({
            message: "Enter the integration keyType (Must be unique for entire of the platform)",
          });
          body.name = await input({ message: "Enter the integration name" });
          body.description = await input({
            message: "Enter the integration short description (should be min 10 and max 100 character)",
          });
          body.platformSupport = await select({
            message: "Enter the integration platformSupport",
            choices: [
              {
                name: "Android",
                value: "ANDROID",
                disabled: false,
              },
              {
                name: "iOS",
                value: "IOS",
                disabled: true,
              },
              {
                name: "React",
                value: "REACT",
                disabled: false,
              },
            ],
          });
          body.kind = await select({
            message: "Enter the integration kind",
            choices: [
              {
                name: "Block",
                value: "BLOCK",
              },
              {
                name: "Action",
                value: "ACTION",
              },
              {
                name: "Logger",
                value: "LOGGER",
              },
            ],
          });
          const directory = await input({ message: "Enter the Integration working directory" });
          const result = await integrationRepository.add(body);
          if (result.onSuccess) {
            const allowed = [
              "name",
              "keyType",
              "imageIcon",
              "price",
              "description",
              "documentation",
              "platformSupport",
              "kind",
              "public",
            ];
            const filtered = Object.fromEntries(
              Object.entries(result.onSuccess).filter(([key, val]) => allowed.includes(key))
            );
            console.log("=========================================================================================");
            const path = createDefaultDir(directory);
            fs.writeFileSync(`${path}/integration.json`, JSON.stringify(filtered));
            console.log(`The result saved into ${path}/integration.json`);
            console.log("=========================================================================================");
          } else {
            console.log(result.onError);
          }
        } catch (e) {
          console.error(e);
          console.log("Filling information interrupted");
        }
      } else {
        console.log(organization.onError);
      }
    });
}

export function syncIntegration(program: Command) {
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
          const data: string = fs.readFileSync(`${path}/integration.json`, "utf-8");
          const json = JSON.parse(data);
          const result = await integrationRepository.update({
            organizationId: organization.onSuccess,
            id: integrationId,
            ...json,
          });
          if (result.onSuccess) {
            const allowed = [
              "name",
              "keyType",
              "imageIcon",
              "price",
              "description",
              "documentation",
              "platformSupport",
              "kind",
              "public",
            ];
            const filtered = Object.fromEntries(
              Object.entries(result.onSuccess).filter(([key, val]) => allowed.includes(key))
            );
            console.log("=========================================================================================");
            const path = createDefaultDir(directory);
            fs.writeFileSync(`${path}/integration.json`, JSON.stringify(filtered));
            console.log(`The result saved into ${path}/integration.json`);
            console.log("=========================================================================================");
          } else {
            console.log(result.onError);
          }
        } catch (e) {
          console.log("Filling information interrupted");
        }
      } else {
        console.log(organization.onError);
      }
    });
}
