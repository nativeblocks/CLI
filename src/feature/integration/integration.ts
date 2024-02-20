import {Command} from "commander";
import {organizationRepository} from "./data/IntegrationRepositoryImpl";

export function integrations(program: Command) {
  return program.command("integrations")
    .description("List of integrations for an organization")
    .option("-orgId, --organizationId", "Organization id")
    .argument('<organizationId>', "id")
    .action(async (organizationId) => {
      const result = await organizationRepository.organizations()
      if (result.onSuccess) {
        console.log(result.onSuccess)
      } else {
        console.log(result.onError)
      }
    });
}