import { NON_MANAGER_COMMANDS, VALID_COMMANDS } from "../constants.js";
import { checkValidInput } from "./checkValidInput.js";
import { parseArgs } from "./parseArgs.js";
import { parseCommand } from "./parseCommand.js";
import path from "node:path";
import { failNonExistingDirectory } from "./failNonValidDirectory.js";
import { appendFile, open, readdir, rename, rm } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { stdout } from "node:process";

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
      try {
        await this[command](...args);
      } catch (error) {
        this.showOperationError(error);
      }
    }

    this.showCurrentPath();
  };
  up = () => {
    this.currentPath = path.join(this.currentPath, "..");
  };

  cd = async (pathToDirectoryRaw) => {
    const pathToDirectory = this.calculatePath(pathToDirectoryRaw);

    await failNonExistingDirectory(pathToDirectory);
    this.currentPath = pathToDirectory;
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

  cat = async (pathToFileRaw) => {
    const pathToFile = this.calculatePath(pathToFileRaw);
    const readStream = createReadStream(pathToFile);
    readStream.on("error", (err) => this.showOperationError(err));

    readStream.pipe(stdout);
  };

  add = async (pathToFileRaw) => {
    const pathToFile = this.calculatePath(pathToFileRaw);
    await appendFile(pathToFile, "", { flag: "ax" });
  };

  rn = async (oldPathRaw, newPathRaw) => {
    const oldPathToFile = this.calculatePath(oldPathRaw);
    const newPathToFile = this.calculatePath(newPathRaw);
    await rename(oldPathToFile, newPathToFile);
  };

  cp = async (sourcePathRaw, targetPathRaw) => {
    const sourcePath = this.calculatePath(sourcePathRaw);
    const targetPath = this.calculatePath(targetPathRaw);
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(targetPath);

    readStream.on("error", (err) => this.showOperationError(err));
    writeStream.on("error", (err) => this.showOperationError(err));
    await pipeline(readStream, writeStream);
  };

  mv = async (sourcePathRaw, targetPathRaw) => {
    await this.cp(sourcePathRaw, targetPathRaw);
    await rm(this.calculatePath(sourcePathRaw));
  };

  calculatePath = (pathToDirentRaw) => {
    const pathToDirent = path.normalize(pathToDirentRaw);
    const newPath = path.isAbsolute(pathToDirent)
      ? pathToDirent
      : path.join(this.currentPath, pathToDirent);
    return newPath;
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
