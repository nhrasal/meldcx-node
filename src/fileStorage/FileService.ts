import fs from "fs";
import { ENV } from "../ENV.config";
import { IFile } from "../controllers/file.controller";
import { awsS3remover } from "./awsUpload";
const filePath = "./src/fileStorage/files.json";
export const FileService = {
  getFiles() {
    const fileString: any = fs.readFileSync(filePath);
    return JSON.parse(fileString);
  },

  writeFiles(data: any): void {
    const files = this.getFiles();
    files.push(data);
    fs.writeFileSync(filePath, JSON.stringify(files));
  },

  async findFilePublicKey(publicKey: string) {
    const files = this.getFiles();
    const findFile = await files.find((file: any) => {
      if (file.publicKey === publicKey) {
        return file;
      }
    });

    if (findFile) {
      const updatedFile = await files.map((file: any) =>
        file.publicKey === publicKey
          ? {
              ...file,
              updatedAt: new Date().toISOString(),
            }
          : file
      );

      fs.writeFileSync(filePath, JSON.stringify(updatedFile));
    }
    if (findFile) return await findFile;
  },

  findFilePrivateKey(privateKey: string) {
    const files = this.getFiles();
    const findFile = files.find((file: any) => {
      if (file.privateKey === privateKey) return file;
    });
    if (findFile) return findFile;
    return "";
  },

  removeFile(privateKey: string) {
    const files = this.getFiles();
    const fileUpdate = files.filter(
      (file: any) => file.privateKey !== privateKey
    );

    fs.writeFileSync(filePath, JSON.stringify(fileUpdate));
    return "ok";
  },

  cleanupInactiveFiles() {
    const files = this.getFiles();

    const now = new Date();
    const inactiveTime = +ENV.CLEANING_PERIOD * 24 * 60 * 60 * 1000; // convert days to milliseconds
    files.forEach((file: IFile) => {
      if (file.uploadType === "local") {
        const stats = fs.statSync(file.path);
        // const lastModified = new Date(stats.mtime);
        const lastModified = new Date(file?.updatedAt || file.createdAt);
        const timeDiff = now.getTime() - lastModified.getTime();
        console.log(
          "🚀 ~ file: FileService.ts:56 ~ files.forEach ~ timeDiff:",
          timeDiff
        );
        if (timeDiff > inactiveTime) {
          FileService.removeFile(file.privateKey);
          fs.unlinkSync(file.path);
        }
      } else {
        FileService.removeFile(file.privateKey);
        awsS3remover(file.path);
      }
    });
  },
};
