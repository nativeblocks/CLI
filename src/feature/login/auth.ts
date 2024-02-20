import {Command} from "commander";
import {authRepository} from "./data/AuthRepositoryImpl";

export function auth(program: Command) {
  return program.command("auth")
    .description("Login")
    .option("-u, --username", "username")
    .option("-p, --password", "password")
    .argument('<username>', "email to auth")
    .argument('<password>', "password for the entered email")
    .action(async (username, password) => {
      const result = await authRepository.authLogin(username, password)
      if (result.onSuccess) {
        console.log(result.onSuccess)
      } else {
        console.log(result.onError)
      }
    });
}