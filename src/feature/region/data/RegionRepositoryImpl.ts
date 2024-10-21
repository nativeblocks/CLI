import fs from "fs";
import os from "os";
import path from "path";
import { ResultModel } from "../../../infrastructure/result/model/ResultModel";
import { RegionRepository } from "./RegionRepository";

class RegionRepositoryImpl implements RegionRepository {
  private userHomeDir: string = os.homedir();
  private regionPath: string = path.join(this.userHomeDir, ".nativeblocks/cli/region.json");
  private directory = path.dirname(this.regionPath);

  set(url: string): ResultModel<string> {
    const urlRegex: RegExp = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(url))
      return {
        onError: `the ${url} is not valid url`,
      };

    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory, { recursive: true });
    }
    const json = {
      region: url,
    };
    try {
      fs.writeFileSync(this.regionPath, JSON.stringify(json));
      return {
        onSuccess: `regin saved to file successfully at ${this.regionPath}`,
      };
    } catch (e) {
      return {
        onError: `regin could not save ${e}`,
      };
    }
  }

  get(): ResultModel<string> {
    if (fs.existsSync(this.regionPath)) {
      try {
        const data: string = fs.readFileSync(this.regionPath, "utf-8");
        const json = JSON.parse(data);
        return {
          onSuccess: json.region,
        };
      } catch (e) {
        return {
          onError: `regin could not retrieve ${e}`,
        };
      }
    } else {
      return {
        onError: `Regin could not retrieve from ${this.regionPath}, please set the region url`,
      };
    }
  }
}

export const regionRepository: RegionRepository = new RegionRepositoryImpl();
