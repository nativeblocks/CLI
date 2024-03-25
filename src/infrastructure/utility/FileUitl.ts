import fs from "fs";

export function createDefaultDir(directory: string, withHiddenForlder: boolean = true) {
  const path = withHiddenForlder ? `${directory}/.nativeblocks` : `${directory}`;
  if (!fs.existsSync(`${path}`)) {
    fs.mkdirSync(`${path}`, { recursive: true });
  }
  return `${path}`;
}
