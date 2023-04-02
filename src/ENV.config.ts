import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  FOLDER: process.env.FOLDER || path.join(__dirname, "files"),
  DOWNLOAD_LIMIT_PER_DAY: process.env.DOWNLOAD_LIMIT_PER_DAY || 20,
  UPLOAD_LIMIT_PER_DAY: process.env.UPLOAD_LIMIT_PER_DAY || 20,
  PROVIDER: process.env.PROVIDER || "local",

  CLEANING_PERIOD_IN_DAY: process.env.CLEANING_PERIOD_IN_DAY || 1,

  // aws
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_PREFIX_URL: process.env.AWS_PREFIX_URL,
  AWS_PREFIX_URL_REMOVE: process.env.AWS_PREFIX_URL_REMOVE,
};
