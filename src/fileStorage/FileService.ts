import fs from "fs";
import { ENV } from "../ENV.config";
import { IFile } from "../controllers/file.controller";
import { awsS3remover } from "./awsUpload";
const filePath = "./src/fileStorage/files.json";
export const FileService = {
  getFiles() {
    try {
      const fileString: any = fs.readFileSync(filePath);
      return fileString ? JSON.parse(fileString) : [];
    } catch (err) {
      return [];
    }
  },

  writeFiles(data: any): string {
    const files = this.getFiles() || [];
    files.push(data);
    fs.writeFileSync(filePath, JSON.stringify(files));
    return "ok";
  },

  async findFilePublicKey(publicKey: string) {
    const files = (await this.getFiles()) || [];
    const findFile = await files.find((file: any) => {
      if (file.publicKey === publicKey) {
        return file;
      }
    });

    if (findFile) return await findFile;
  },

  async readUpdateFile(publicKey: string) {
    const files = (await this.getFiles()) || [];
    const updatedFile = await files.map((file: any) =>
      file.publicKey === publicKey
        ? {
            ...file,
            updatedAt: new Date().toISOString(),
          }
        : file
    );
    fs.writeFileSync(filePath, JSON.stringify(updatedFile));
  },

  async findFilePrivateKey(privateKey: string) {
    const files = (await this.getFiles()) || [];
    const findFile = await files.find((file: any) => {
      if (file.privateKey === privateKey) return file;
    });
    if (findFile) return findFile;
    return null;
  },

  async removeFile(privateKey: string) {
    const files = (await this.getFiles()) || [];
    const fileUpdate = files.filter(
      (file: any) => file.privateKey !== privateKey
    );

    fs.writeFileSync(filePath, JSON.stringify(fileUpdate));
    return "ok";
  },

  async cleanupInactiveFiles() {
    const files = (await this.getFiles()) || [];

    const now = new Date();
    const inactiveTime = +ENV.CLEANING_PERIOD_IN_DAY * 24 * 60 * 60 * 1000; // convert days to milliseconds
    files.forEach((file: IFile) => {
      const stats = fs.statSync(file.path);
      // const lastModified = new Date(stats.mtime);
      const lastModified = new Date(file?.updatedAt || file.createdAt);
      const timeDiff = now.getTime() - lastModified.getTime();
      if (timeDiff > inactiveTime) {
        if (file.uploadType === "local") {
          FileService.removeFile(file.privateKey);
          fs.unlinkSync(file.path);
        } else {
          FileService.removeFile(file.privateKey);
          awsS3remover(file.path);
        }
      }
    });
  },
};
