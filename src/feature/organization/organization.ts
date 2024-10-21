import { Command } from "commander";
import { organizationRepository } from "./data/OrganizationRepositoryImpl";

export function organization(program: Command) {
  return program.command("organization").description("Manage organization");
}

export function organizationList(program: Command) {
  return program
    .command("list")
    .description("List of organization")
    .action(async () => {
      const result = await organizationRepository.organizations();
      if (result.onSuccess) {
        console.table(result.onSuccess);
      } else {
        console.log(result.onError);
      }
    });
}

export function setOrganization(program: Command) {
  return program
    .command("set")
    .description("Set the organization")
    .option("-id, --id", "Organization id")
    .argument("<id>", "Organization id")
    .action(async (id) => {
      const result = await organizationRepository.set(id);
      if (result.onSuccess) {
        console.log(result.onSuccess);
      } else {
        console.error(result.onError);
      }
    });
}

export function getOrganization(program: Command) {
  return program
    .command("get")
    .description("Get the active organization")
    .action(async () => {
      const result = await organizationRepository.get();
      if (result.onSuccess) {
        console.log(result.onSuccess);
      } else {
        console.error(result.onError);
      }
    });
}
