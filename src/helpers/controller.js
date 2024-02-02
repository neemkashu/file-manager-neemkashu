import { NON_MANAGER_COMMANDS, VALID_COMMANDS } from "../constants.js";
import { checkValidInput } from "./checkValidInput.js";
import { parseArgs } from "./parseArgs.js";
import { parseCommand } from "./parseCommand.js";
import path from "node:path";
import { failNonExistingDirectory } from "./failNonValidDirectory.js";
import { readdir } from "node:fs/promises";

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

    if (NON_MANAGER_COMMANDS.includes(command)) return;

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

      await failNonExistingDirectory(newPath);
      this.currentPath = newPath;
    } catch (err) {
      this.showOperationError(err);
    }
  };

  ls = async () => {
    const contents = await readdir(this.currentPath, { withFileTypes: true });

    console.table(
      contents
        .map((dirent) => {
          return {
            Name: dirent.name,
            Type: dirent.isFile() ? "file" : "directory",
          };
        })
        .sort(({ Name: NameA, Type: TypeA }, { Name: NameB, Type: TypeB }) => {
          if (TypeA === TypeB) {
            return NameA.localeCompare(NameB);
          }
          return TypeA.localeCompare(TypeB);
        })
    );
  };

  showCurrentPath = () => {
    console.log(`You are currently in ${this.currentPath}`);
  };
  showValidationError = () => {
    console.log("Invalid input");
  };
  showOperationError = (err) => {
    console.log(`Operation failed: ${err.message}`);
  };
}
