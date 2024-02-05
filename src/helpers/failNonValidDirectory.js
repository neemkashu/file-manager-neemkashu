import { stat } from "node:fs/promises";

export const failNonExistingDirectory = async (path) => {
  const stats = await stat(path);
  if (!stats.isDirectory()) {
    throw new Error(`${path} is not an existing directory`);
  }
};
