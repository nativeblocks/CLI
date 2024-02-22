import {Command} from "commander";
import {integrationRepository} from "./data/IntegrationRepositoryImpl";
import {confirm, input, select} from "@inquirer/prompts";

export function integrations(program: Command) {
  return program.command("list")
    .description("List of integrations for an organization")
    .option("-orgId, --organizationId", "Organization id")
    .option("-p, --platform", "Platform of integration, ANDROID, IOS, REACT")
    .option("-k, --kind", "Kind of integration, BLOCK, MAGIC, LOGGER or ALL")
    .option("-public, --public", "Public or private integration")
    .argument('<organizationId>', "id")
    .argument('<platform>', "platform")
    .argument('[kind]', "kind", "ALL")
    .argument('[public]', "public", true)
    .action(async (organizationId, platform, kind, isPublic) => {
      const result = await integrationRepository.integrations(
        organizationId, isPublic, kind, platform
      )
      if (result.onSuccess) {
        console.table(result.onSuccess, ["id", "name", "keyType", "kind", "platformSupport", "public"])
      } else {
        console.log(result.onError)
      }
    });
}

export function integration(program: Command) {
  return program.command("integration")
    .description("The integration detail")
    .option("-orgId, --organizationId", "Organization id")
    .option("-id, --integrationId", "Integration id")
    .argument('<organizationId>', "id")
    .argument('<integrationId>', "id")
    .action(async (organizationId, integrationId) => {
      const result = await integrationRepository.integration(organizationId, integrationId)
      if (result.onSuccess) {
        const allowed = [
          "id",
          "name",
          "keyType",
          "imageIcon",
          "price",
          "version",
          "description",
          "documentation",
          "platformSupport",
          "kind",
          "public",
          "paymentRequire",
          "manageable",
        ];
        const filtered = Object.fromEntries(
          Object.entries(result.onSuccess).filter(([key, val]) => allowed.includes(key))
        );
        console.log(filtered)
      } else {
        console.log(result.onError)
      }
    });
}

export function addIntegration(program: Command) {
  return program.command("add")
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
        }
        body.organizationId = await input({message: "Enter organization id (Owner of the integration)"})
        body.keyType = await input({message: "Enter the integration keyType (Must be unique for entire of the platform)"})
        body.name = await input({message: "Enter the integration name"})
        body.imageIcon = await input({message: "Enter the integration imageIcon url"})
        body.price = Number(await input({message: "Enter the integration price leave 0 if it's free"}))
        body.description = await input({message: "Enter the integration short description"})
        body.documentation = await input({message: "Enter the integration documentation in MD format"})
        body.platformSupport = await select({
          message: "Enter the integration platformSupport",
          choices: [
            {
              name: "Android",
              value: "ANDROID",
              disabled: false
            },
            {
              name: "iOS",
              value: "IOS",
              disabled: true
            },
            {
              name: "React",
              value: "REACT",
              disabled: false
            }
          ]
        })
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
            }
          ]
        })
        body.public = await confirm({message: "Is the integration public"})
        const result = await integrationRepository.add(body)
        if (result.onSuccess) {
          console.table(result.onSuccess)
        } else {
          console.log(result.onError)
        }
      } catch (e) {
        console.log("Filling information interrupted")
      }
    });
}