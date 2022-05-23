import logger from "../core/loaders/logger";

export const sleep = (ms: number) => new Promise(resolve => {
  logger.info(`Waiting ${~~ms / 1000}s`);
  setTimeout(resolve, ms);
});