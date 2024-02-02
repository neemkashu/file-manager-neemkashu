import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

export const compressFromTo = async (sourcePath, targetPath) => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);

  readStream.on("error", (err) => this.showOperationError(err));
  writeStream.on("error", (err) => this.showOperationError(err));

  await pipeline(readStream, zlib.createBrotliCompress(), writeStream);
};

export const decompressFromTo = async (sourcePath, targetPath) => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);

  readStream.on("error", (err) => this.showOperationError(err));
  writeStream.on("error", (err) => this.showOperationError(err));

  await pipeline(readStream, zlib.createBrotliDecompress(), writeStream);
};
