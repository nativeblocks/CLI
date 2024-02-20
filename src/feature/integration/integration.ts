import {Command} from "commander";
import {integrationRepository} from "./data/IntegrationRepositoryImpl";

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
    .option("-orgId, --organizationId", "Organization id")
    .option("-i, --input", "Input of integration")
    .argument('<organizationId>', "id")
    .argument('<input>', "json")
    .action(async (organizationId, input) => {
      console.log("Hello")
      // const result = await integrationRepository.integration(organizationId, integrationId)
      // if (result.onSuccess) {
      //   const allowed = [
      //     "id",
      //     "name",
      //     "keyType",
      //     "imageIcon",
      //     "price",
      //     "version",
      //     "description",
      //     "documentation",
      //     "platformSupport",
      //     "kind",
      //     "public",
      //     "paymentRequire",
      //     "manageable",
      //   ];
      //   const filtered = Object.fromEntries(
      //     Object.entries(result.onSuccess).filter(([key, val]) => allowed.includes(key))
      //   );
      //   console.log(filtered)
      // } else {
      //   console.log(result.onError)
      // }
    });
}