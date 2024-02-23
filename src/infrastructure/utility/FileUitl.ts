import fs from "fs";
import os from "os";
import path from "path";

export function createDefaultDir() {
  // const path = `${__dirname}/.nativeblocks`
  const userHomeDir: string = os.homedir();
  const credentialPath: string = path.join(userHomeDir, ".nativeblocks/cli/sample/test");
  const directory = path.dirname(credentialPath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {recursive: true});
  }
  return directory
}