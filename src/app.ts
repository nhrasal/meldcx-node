import express, { Application } from "express";
import * as FS from "fs";

import { ENV } from "./ENV.config";
import swaggerUi from "swagger-ui-express";
import FileRouter from "./routes";
import { isInvalidEnvConfigured, swaggerSpec } from "./utils";
import { Middleware } from "./middlewares/uploadDownload.middlewares";

const app: Application = express();

if (isInvalidEnvConfigured()) {
  console.log("🚀 Please configured your .env file and given variable");
  process.exit(1);
}

if (!FS.existsSync("src/fileStorage/files.json")) {
  FS.writeFileSync("src/fileStorage/files.json", "[]");
}

if (!FS.existsSync(ENV.FOLDER)) {
  FS.mkdirSync(ENV.FOLDER, { recursive: true });
}

// Middleware for enforcing daily download and upload limits per IP address
app.use(Middleware);
app.use(FileRouter);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;
