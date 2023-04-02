import express, { Application } from "express";
import * as FS from "fs";

import { ENV } from "./ENV.config";
import { Middleware } from "./middlewares/uploadDownload.middlewares";
import { FileUpload } from "./utils/fileUpload";
import { FileController } from "./controllers/file.controller";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import FileRouter from "./routes";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "File Sharing API",
    version: "1.0.0",
    description: "Simple file upload download and remove",
  },
  servers: [
    {
      url: "http://localhost:" + ENV.PORT,
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${__dirname}/routes/index.ts`, "./dist/routes/index.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const app: Application = express();

if (!ENV.PORT) {
  process.exit(1);
}

if (!FS.existsSync("src/fileStorage/files.json")) {
  FS.writeFileSync("src/fileStorage/files.json", "[]");
}

if (!FS.existsSync(ENV.FOLDER)) {
  FS.mkdirSync(ENV.FOLDER, { recursive: true });
}

// Middleware for enforcing daily download and upload limits per IP address
// app.use(Middleware);
// app.post("/files", FileUpload.single("file"), FileController.storeFiles);
app.use(FileRouter);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;
