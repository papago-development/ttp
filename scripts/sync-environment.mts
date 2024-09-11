import * as fs from "fs";
import * as semver from "semver";
import { execute } from "./lib/cli.mjs";
import { joinPath, replaceInFile } from "./lib/file-helper.mjs";
import { exec } from "./lib/subprocess.mjs";

async function syncBuildInfo(): Promise<void> {
  // Read the short hash of the current commit
  const changeset = (
    await exec("git rev-parse --short --verify HEAD")
  ).stdout.trim();

  // Update the changeset in the environment file
  replaceInFile(
    joinPath("src", "environments", "environment.prod.ts"),
    /changeset: '(.*)'/g,
    "changeset: '" + changeset + "'",
  );
}

async function syncVersionInfo(): Promise<void> {
  // Read the version from the package.json
  const version = JSON.parse(
    fs.readFileSync(joinPath("package.json"), "utf8"),
  ).version;
  const majorVersionNumber = semver.major(version);
  const minorVersionNumber = semver.minor(version);
  const patchVersionNumber = semver.patch(version);

  // Update the version in the environment files
  replaceInFile(
    joinPath("src", "environments", "environment.prod.ts"),
    /major: '(.*)'/g,
    "major: '" + majorVersionNumber + "'",
  );
  replaceInFile(
    joinPath("src", "environments", "environment.prod.ts"),
    /minor: '(.*)'/g,
    "minor: '" + minorVersionNumber + "'",
  );
  replaceInFile(
    joinPath("src", "environments", "environment.prod.ts"),
    /patch: '(.*)'/g,
    "patch: '" + patchVersionNumber + "'",
  );
}

execute(async () => {
  await syncBuildInfo();
  await syncVersionInfo();
});
