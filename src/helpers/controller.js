import { parseCommand } from "./parseCommand.js";

export class Controller {
  constructor(currentPath) {
    this.currentPath = currentPath;
  }
  callCommand = (lineRaw) => {
    const line = lineRaw.trim();
    const command = parseCommand(line);
    if (!command) {
      console.log("Be sure to provide some command from command list");
    }
  };
}
