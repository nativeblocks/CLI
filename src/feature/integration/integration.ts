import { confirm, input, select } from "@inquirer/prompts";
import { Command } from "commander";
import fs from "fs";
import { createDefaultDir } from "../../infrastructure/utility/FileUitl";
import { integrationRepository } from "./data/repository/IntegrationRepositoryImpl";
import {
  generateDataClassForData,
  generateDataClassForEvents,
  generateDataClassFromProperties,
  toPascalCase,
} from "./codegen/kotlin";

export function integrations(program: Command) {
  return program
    .command("list")
    .description("List of integrations for an organization")
    .option("-orgId, --organizationId", "Organization id")
    .option("-p, --platform", "Platform of integration, ANDROID, IOS, REACT")
    .option("-k, --kind", "Kind of integration, BLOCK, MAGIC, LOGGER or ALL")
    .argument("<organizationId>", "id")
    .argument("<platform>", "platform")
    .argument("[kind]", "kind", "ALL")
    .action(async (organizationId, platform, kind) => {
      const result = await integrationRepository.integrations(organizationId, kind, platform);
      if (result.onSuccess) {
        console.table(result.onSuccess, ["id", "name", "keyType", "kind", "platformSupport", "public"]);
      } else {
        console.log(result.onError);
      }
    });
}

export function integration(program: Command) {
  return program
    .command("integration")
    .description("The integration detail")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "Integration working directory")
    .argument("<organizationId>", "Organization id")
    .argument("<integrationId>", "Integration id")
    .argument("<directory>", "Integration working directory")
    .action(async (organizationId, integrationId, directory) => {
      const result = await integrationRepository.integration(organizationId, integrationId);
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
    });
}

export function addIntegration(program: Command) {
  return program
    .command("add")
    .description("Add a new integration")
    .action(async () => {
      try {
        const body = {
          organizationId: "",
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
        body.organizationId = await input({ message: "Enter organization id (Owner of the integration)" });
        body.keyType = await input({
          message: "Enter the integration keyType (Must be unique for entire of the platform)",
        });
        body.name = await input({ message: "Enter the integration name" });
        // body.imageIcon = await input({ message: "Enter the integration imageIcon url" });
        // body.price = Number(await input({ message: "Enter the integration price leave 0 if it's free" }));
        body.description = await input({ message: "Enter the integration short description (should be min 10 and max 100 character)" });
        body.documentation = await input({ message: "Enter the integration documentation in MD format" });
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
              name: "Magic",
              value: "MAGIC",
            },
            {
              name: "Logger",
              value: "LOGGER",
            },
          ],
        });
        body.public = await confirm({ message: "Is the integration public" });
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
    });
}

export function syncIntegration(program: Command) {
  return program
    .command("sync")
    .description("Update the integration")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .option("-d, --directory", "Integration working directory")
    .argument("<organizationId>", "Organization id")
    .argument("<integrationId>", "Integration id")
    .argument("<directory>", "Integration working directory")
    .action(async (organizationId, integrationId, directory) => {
      try {
        const path = createDefaultDir(directory);
        const data: string = fs.readFileSync(`${path}/integration.json`, "utf-8");
        const json = JSON.parse(data);
        const result = await integrationRepository.update({
          organizationId: organizationId,
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
    });
}

export function generateIntegration(program: Command) {
  return program
    .command("gen")
    .description("Generate the integration Kotlin/Typescript/Swift classes")
    .action(async () => {
      try {
        const language = await select({
          message: "Enter the integration languages",
          choices: [
            {
              name: "Kotlin",
              value: "KOTLIN",
              disabled: false,
            },
            {
              name: "Swift",
              value: "SWIFT",
              disabled: true,
            },
            {
              name: "Typescript",
              value: "TYPESCRIPT",
              disabled: true,
            },
          ],
        });
        const directory = await input({ message: "Enter the Integration working directory" });

        if (language === "KOTLIN") {
          const packageName = await input({ message: "Enter the integration packageName" });

          const path = createDefaultDir(directory);
          const integration: string = fs.readFileSync(`${path}/integration.json`, "utf-8");
          const properties: string = fs.readFileSync(`${path}/properties.json`, "utf-8");
          const events: string = fs.readFileSync(`${path}/events.json`, "utf-8");
          const data: string = fs.readFileSync(`${path}/data.json`, "utf-8");

          const integrationObject = JSON.parse(integration);
          const classNameForObject = toPascalCase(integrationObject["name"]);
          const generatedProperties = generateDataClassFromProperties(
            JSON.parse(properties),
            packageName + ".meta",
            classNameForObject + "Properties"
          );
          const generatedEvents = generateDataClassForEvents(
            JSON.parse(events),
            packageName + ".meta",
            classNameForObject + "Events"
          );
          const generatedData = generateDataClassForData(
            JSON.parse(data),
            packageName + ".meta",
            classNameForObject + "Data"
          );
          console.log("=========================================================================================");
          const kotlinPath = createDefaultDir(directory + "/meta", false);
          fs.writeFileSync(`${kotlinPath}/${classNameForObject + "Properties"}.kt`, generatedProperties);
          fs.writeFileSync(`${kotlinPath}/${classNameForObject + "Events"}.kt`, generatedEvents);
          fs.writeFileSync(`${kotlinPath}/${classNameForObject + "Data"}.kt`, generatedData);
          console.log(`The result saved into ${kotlinPath}`);
          console.log("=========================================================================================");
        }
      } catch (e) {
        console.log("E", e);

        console.log("Filling information interrupted");
      }
    });
}
