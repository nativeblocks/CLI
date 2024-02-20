import {Command} from "commander";
import {integrationRepository} from "./data/IntegrationRepositoryImpl";

export function integrations(program: Command) {
  return program.command("integrations")
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
        console.table(result.onSuccess, ["id", "name", "keyType", "kind", "platformSupport", "version"])
      } else {
        console.log(result.onError)
      }
    });
}