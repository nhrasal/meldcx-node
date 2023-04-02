import express, { Router } from "express";
import { FileController } from "../controllers/file.controller";
import { FileUpload } from "../utils/fileUpload";

const FileRouter = express();
/**
 * @swagger
 * /files:
 *      post:
 *          summary: send a file
 *          tags:
 *              - File Upload
 *          description: .
 *          requestBody:
 *              content:
 *               multipart/form-data:
 *                  schema:
 *                   type: object
 *                   properties:
 *                       fileName:
 *                       type: string
 *                       format: binary
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  publicKey:
 *                                      type: string
 *                                      example: public key for read file!
 *                                  privateKey:
 *                                      type: string
 *                                      example: private key for remove file!
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
FileRouter.post("/files", FileUpload.single("file"), FileController.storeFiles);
/**
 * @swagger
 * /files/{publicKey}:
 *   get:
 *     summary: please send your public key
 *     tags:
 *          - Read File
 *     description: This api for remove file using public Key
 *     parameters:
 *       - in: path
 *         name: publicKey
 *         type: string
 *         required: true
 *         description: String public key.
 *     responses:
 *       200:
 *         description: Read a File.
 */
FileRouter.get("/files/:publicKey", FileController.getFile);
/**
 * @swagger
 * /files/{privateKey}:
 *   delete:
 *     summary: please send your private key
 *     tags:
 *          - Remove File
 *     description: This api for read file using private Key
 *     parameters:
 *       - in: path
 *         name: privateKey
 *         type: string
 *         required: true
 *         description: String private key.
 *     responses:
 *       200:
 *         description: Remove file from server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 */
FileRouter.delete("/files/:privateKey", FileController.removeFile);

export default FileRouter;
