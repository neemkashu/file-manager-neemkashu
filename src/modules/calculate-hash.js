import crypto from "node:crypto";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";

export const calculateHash = (pathToFile) => {
  const hash = crypto.createHash("sha256");
  const input = createReadStream(pathToFile);

  input.on("error", (err) => console.log("Operation failed:", err.message));

  input.pipe(hash).setEncoding("hex").pipe(stdout);
};
