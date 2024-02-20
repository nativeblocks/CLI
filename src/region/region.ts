import {Command} from "commander";
import {regionRepository} from "./data/RegionRepositoryImpl";

export function region(program: Command) {
  return program
    .command("region")
    .description("Set or get the active region")
    .option("-s, --set", "Set api region url")
    .option("-g, --get", "Get api region url")
    .argument("[url]", "Region url")
    .action((url, options) => {
      if (options.set) {
        const result = regionRepository.set(url);
        if (result.onSuccess) {
          console.log(result.onSuccess);
        } else {
          console.error(result.onError);
        }
      } else if (options.get) {
        const result = regionRepository.get();
        if (result.onSuccess) {
          console.log(result.onSuccess)
        } else {
          console.error(result.onError)
        }
      }
    });
}