import figlet from "figlet"
import {Command} from "commander";
import {region} from "./feature/region/region";
import {auth} from "./feature/login/auth";
import {organization} from "./feature/organization/organization";
import {integrations} from "./feature/integration/integration";

const program = new Command();

console.log(figlet.textSync("Nativeblocks"));

program
  .name("nativeblocks")
  .description("Nativeblocks CLI for integration management")
  .version("0.1.0");

region(program)
auth(program)
organization(program)
integrations(program)

program.parse();