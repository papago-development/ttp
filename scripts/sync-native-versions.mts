import * as fs from "fs";
import { execute } from "./lib/cli.mjs";
import { joinPath } from "./lib/file-helper.mjs";
import { loadMobileProject } from "./lib/trapeze-helper.mjs";

execute(async () => {
  // Read the version from the package.json
  const version = JSON.parse(
    fs.readFileSync(joinPath("package.json"), "utf8"),
  ).version;

  // Load the mobile project
  const project = await loadMobileProject();

  // Update the version in the Android project
  await project.android?.incrementVersionCode();
  await project.android?.setVersionName(version);

  // Update the version in the iOS project
  await project.ios?.incrementBuild();
  await project.ios?.setVersion(null, null, version);

  // Save the changes
  await project.commit();
});
