import { VALID_COMMANDS } from "../constants.js";
import { checkValidInput } from "./checkValidInput.js";
import { parseArgs } from "./parseArgs.js";
import { parseCommand } from "./parseCommand.js";
import path from "node:path";
import fs from "node:fs/promises";

export class Controller {
  constructor(initialPath) {
    this.currentPath = initialPath;
  }
  callCommand = async (lineRaw) => {
    const line = lineRaw.trim();
    const command = parseCommand(line);
    const args = parseArgs(line);
    const isValidCommand = checkValidInput(
      VALID_COMMANDS,
      command,
      args.length
    );

    if (command === ".exit") return;

    if (!isValidCommand) {
      this.showValidationError();
    } else {
      await this[command](args);
    }

    this.showCurrentPath();
  };
  up = () => {
    this.currentPath = path.join(this.currentPath, "..");
  };

  cd = async (args) => {
    try {
      const pathToDirectory = path.normalize(args[0]);
      const newPath = path.isAbsolute(pathToDirectory)
        ? pathToDirectory
        : path.join(this.currentPath, pathToDirectory);

      // TODO: replace with check access and isDirectory
      await fs.opendir(newPath);
      this.currentPath = newPath;
    } catch {
      this.showOperationError();
    }
  };

  showCurrentPath = () => {
    console.log(`You are currently in ${this.currentPath}`);
  };
  showValidationError = () => {
    console.log("Invalid input");
  };
  showOperationError = () => {
    console.log("Operation failed");
  };
}
