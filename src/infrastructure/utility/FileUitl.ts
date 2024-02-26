import fs from "fs";

export function createDefaultDir(directory: string) {
  if (!fs.existsSync(`${directory}/.nativeblocks`)) {
    fs.mkdirSync(`${directory}/.nativeblocks`, {recursive: true});
  }
  return `${directory}/.nativeblocks`
}