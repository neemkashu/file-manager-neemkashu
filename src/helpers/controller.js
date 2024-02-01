import { VALID_COMMANDS } from "../constants.js";
import { parseArgs } from "./parseArgs.js";
import { parseCommand } from "./parseCommand.js";
import path from "node:path";

export class Controller {
  constructor(initialPath) {
    this.currentPath = initialPath;
  }
  callCommand = async (lineRaw) => {
    const line = lineRaw.trim();
    const command = parseCommand(line);
    const args = parseArgs();
    const isValidCommand = command && VALID_COMMANDS.includes(command);

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
