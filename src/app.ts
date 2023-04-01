import express, { Application } from "express";
import * as FS from "fs";

import { ENV } from "./ENV.config";
import { Middleware } from "./middlewares/uploadDownload.middlewares";
import { FileUpload } from "./utils/fileUpload";
import { FileController } from "./controllers/file.controller";

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
app.use(Middleware);

app.post("/files", FileUpload, FileController.storeFiles);

app.get("/files/:publicKey", FileController.getFile);

app.delete("/files/:privateKey", FileController.removeFile);

export default app;
