import multer from "multer";
import path from "path";
import crypto from "crypto";
import { ENV } from "../ENV.config";

export const FileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, ENV.FOLDER);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const randomString = crypto.randomBytes(5).toString("hex");
      const extension = path.extname(file.originalname);
      const fileName = `${timestamp}-${randomString}${extension}`;
      cb(null, fileName);
    },
  }),
});
