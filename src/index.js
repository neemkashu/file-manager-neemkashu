import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { parseCliArg } from "./helpers/parseCliArg.js";

const rl = readline.createInterface({ input, output });

// const answer = await rl.question("What do you think of Node.js? ");

const { value: userName } = parseCliArg(process.argv[2]);
console.log(`Welcome to the File Manager, ${userName}!`);

rl.close();
