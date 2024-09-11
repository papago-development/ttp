import { MobileProject, MobileProjectConfig } from "@trapezedev/project";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

export async function loadMobileProject(): Promise<MobileProject> {
  const config: MobileProjectConfig = {
    ios: {
      path: "ios/App",
    },
    android: {
      path: "android",
    },
  };

  const project = new MobileProject(
    path.join(__filename, "../", "../", "../"),
    config,
  );
  await project.load();
  return project;
}
