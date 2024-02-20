import figlet from "figlet"
import {Command} from "commander";

const program = new Command();

console.log(figlet.textSync("Nativeblocks"));

program
  .name("nativeblocks")
  .description("Nativeblocks CLI for integration management")
  .version("0.1.0");

program.parse();