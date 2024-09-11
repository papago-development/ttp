import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

/**
 * Joins the given parts into a path relative to the root of the project.
 */
export function joinPath(...parts: string[]): string {
  return path.join(__filename, "../", "../", "../", ...parts);
}

/**
 * Replaces the given search value with the given replace value in the given file.
 */
export async function replaceInFile(
  filePath: string,
  searchValue: string | RegExp,
  replaceValue: string,
): Promise<void> {
  let data = fs.readFileSync(filePath, "utf8");
  data = data.replace(searchValue, replaceValue);
  fs.writeFileSync(filePath, data, "utf8");
}
