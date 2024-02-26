import {Command} from "commander";
import {organizationRepository} from "./data/OrganizationRepositoryImpl";

export function organization(program: Command) {
  return program.command("organization list")
    .description("List of organization")
    .action(async () => {
      const result = await organizationRepository.organizations()
      if (result.onSuccess) {
        console.table(result.onSuccess)
      } else {
        console.log(result.onError)
      }
    });
}