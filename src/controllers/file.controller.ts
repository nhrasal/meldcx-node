import crypto from "crypto";
import { FileService } from "../fileStorage/FileService";
import path from "path";
import fs from "fs";
import { awsS3remover, awsS3uploader } from "../fileStorage/awsUpload";
import { ENV } from "../ENV.config";
import { Request, Response } from "express";

export interface IFile {
  publicKey: string;
  privateKey: string;
  name: string;
  mimeType: string;
  size: number;
  path: string;
  uploadType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export const FileController = {
  async storeFiles(req: Request, res: Response) {
    console.log(req.file);
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }
    const publicKey = crypto.randomBytes(20).toString("hex");
    const privateKey = crypto.randomBytes(16).toString("hex");
    // save the public and private keys to a JSON file
    try {
      const fileObject: IFile = {
        publicKey,
        privateKey,
        name: req?.file?.filename || "",
        mimeType: req.file.mimetype || "",
        size: req?.file?.size || 0,
        path: req?.file?.path || "",
        uploadType: ENV.PROVIDER,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (ENV.PROVIDER === "aws") {
        const awsFile = await awsS3uploader(req.file, ENV.FOLDER);
        fileObject.name = awsFile.Key;
        fileObject.path = awsFile.Location;
        const filePath = path.join(__dirname, "../../" + req?.file?.path);
        fs.unlinkSync(filePath);
      }

      FileService.writeFiles(fileObject);
      return res.status(200).json({ publicKey, privateKey });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  async getFile(req: Request, res: Response) {
    const publicKey = req.params.publicKey;
    if (!publicKey) res.status(400).send("Please try with valid public key");
    const findFile: IFile = await FileService.findFilePublicKey(publicKey);

    if (!findFile?.path) {
      return res.status(404).json({
        message: "File not found!",
      });
    }
    let filePath = "";
    if (findFile.uploadType === "local") {
      filePath = path.join(__dirname, "../../" + findFile?.path);

      if (!fs.existsSync(filePath)) {
        await FileService.removeFile(findFile.privateKey);
        return res.status(404).json({
          message: "File not found!",
        });
      }
      const fileStream = await fs.createReadStream(filePath);
      res.setHeader("Content-Type", findFile.mimeType);
      return fileStream.pipe(res);
    } else {
      return res.send(findFile.path);
    }
  },

  async removeFile(req: Request, res: Response) {
    const privateKey = req.params.privateKey;
    const findFile = FileService.findFilePrivateKey(privateKey);

    if (!findFile)
      return res.status(500).json({
        success: false,
        message: "File not found",
      });

    try {
      if (findFile.uploadType === "local") {
        const filePath = path.join(__dirname, "../../" + findFile.path);
        if (!fs.existsSync(filePath)) {
          return res.status(404).send("File not found");
        }
        FileService.removeFile(privateKey);
        fs.unlinkSync(filePath);
        return res.status(200).json({ message: "File deleted successfully" });
      }
      awsS3remover(findFile.path);
      FileService.removeFile(privateKey);
      return res.status(200).json({ message: "File deleted successfully" });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
