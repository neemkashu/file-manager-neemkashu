import os from "node:os";
import { InputError } from "./errors.js";

const VALID_ARGS = ["EOL", "cpus", "homedir", "username", "architecture"];

export class OsReader {
  read = (arg) => {
    const isValidArgument = this.checkValidArgs(arg);

    if (!isValidArgument) throw new InputError();

    const method = arg.toLowerCase().slice(2);

    return this[method]();
  };
  checkValidArgs = (arg) => {
    if (!String(arg).startsWith("--")) return false;
    return VALID_ARGS.includes(arg.slice(2));
  };
  eol = () => {
    return os.EOL;
  };
  cpus = () => {
    const data = os.cpus();
    console.log("Total number:", data.length);
    return data.map(({ model, speed }) => {
      return {
        model,
        "Clock Rate": `${Math.round(Number(speed) / 100) / 10} GHz`,
      };
    });
  };
  username = () => {
    return os.userInfo().username;
  };
  homedir = () => {
    return os.userInfo().homedir;
  };
  architecture = () => {
    return os.arch();
  };
}
