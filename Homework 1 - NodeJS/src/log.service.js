import { EventEmitter } from "node:events";
import { appendFileSync } from "node:fs";
import { createPath } from "../utils.js";

const LOG = createPath[("data", "log.txt")];

export const logger = new EventEmitter();

logger
  .on("book-added", (bookId) => {
    appendFileSync(LOG, `Book with id ${bookId} was added to inventory on : ${new Date()}\n`);
  })
  .on("book-edited", (bookId) => {
    appendFileSync(LOG, `Book with id ${bookId} was edited on: ${new Date()}\n`);
  })
  .on("book-deleted", (bookId) => {
    appendFileSync(LOG, `Book with id ${bookId} was deketed on: ${new Date()}\n`);
  });
