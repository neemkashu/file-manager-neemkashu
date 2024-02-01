import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { parseCliArg } from "./helpers/parseCliArg.js";
import { speakToUser } from "./helpers/speakToUser.js";
import { Closer } from "./helpers/closer.js";
import { Controller } from "./helpers/controller.js";

const initialPath = process.env.HOME;

const rl = readline.createInterface({ input, output });
const closer = new Closer(rl);
const controller = new Controller(initialPath);

const { value: userName } = parseCliArg(process.argv[2]);
speakToUser(userName);

rl.on("close", () => {
  speakToUser(userName, true);
});

rl.on("line", closer.close);

rl.on("line", controller.callCommand);
