/* Load mongooseLoader before expressLoader to set global mongoose plugins to all models */
import mongooseLoader from "./mongoose";
import { Application } from "express";
import expressLoader from "./express";
import Logger from "./logger";

export default async ({ app }: { app: Application }) => {
  Logger.info(`The current environment is in ${process.env.NODE_ENV} mode`);

  await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  expressLoader({ app });
  Logger.info("✌️ Express loaded");
};
