import fs from "fs";
import os from "os";
import path from "path";

export function createDefaultDir() {
  const directory = `${__dirname}/.nativeblocks`
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {recursive: true});
  }
  return directory
}