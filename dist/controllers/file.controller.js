"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const FileService_1 = require("../fileStorage/FileService");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const awsUpload_1 = require("../fileStorage/awsUpload");
const ENV_config_1 = require("../ENV.config");
exports.FileController = {
    storeFiles(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                res.status(500).send("No file uploaded");
                return;
            }
            const publicKey = crypto_1.default.randomBytes(20).toString("hex");
            const privateKey = crypto_1.default.randomBytes(16).toString("hex");
            // save the public and private keys to a JSON file
            try {
                const fileObject = {
                    publicKey,
                    privateKey,
                    name: ((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename) || "",
                    mimeType: req.file.mimetype || "",
                    size: ((_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.size) || 0,
                    path: ((_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.path) || "",
                    uploadType: ENV_config_1.ENV.PROVIDER,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                if (ENV_config_1.ENV.PROVIDER === "aws") {
                    const awsFile = yield (0, awsUpload_1.awsS3uploader)(req.file, ENV_config_1.ENV.FOLDER);
                    fileObject.name = awsFile.Key;
                    fileObject.path = awsFile.Location;
                    const filePath = path_1.default.join(__dirname, "../../" + ((_d = req === null || req === void 0 ? void 0 : req.file) === null || _d === void 0 ? void 0 : _d.path));
                    fs_1.default.unlinkSync(filePath);
                }
                FileService_1.FileService.writeFiles(fileObject);
                return res.status(200).json({ publicKey, privateKey });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message,
                });
            }
        });
    },
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicKey = req.params.publicKey;
            if (!publicKey)
                res.status(400).send("Please try with valid public key");
            const findFile = yield FileService_1.FileService.findFilePublicKey(publicKey);
            if (!(findFile === null || findFile === void 0 ? void 0 : findFile.path)) {
                return res.status(404).json({
                    message: "File not found!",
                });
            }
            let filePath = "";
            if (findFile.uploadType === "local") {
                filePath = path_1.default.join(__dirname, "../../" + (findFile === null || findFile === void 0 ? void 0 : findFile.path));
                if (!fs_1.default.existsSync(filePath)) {
                    yield FileService_1.FileService.removeFile(findFile.privateKey);
                    return res.status(404).json({
                        message: "File not found!",
                    });
                }
                FileService_1.FileService.readUpdateFile(publicKey);
                const fileStream = yield fs_1.default.createReadStream(filePath);
                res.setHeader("Content-Type", findFile.mimeType);
                return fileStream.pipe(res);
            }
            else {
                return res.send(findFile.path);
            }
        });
    },
    removeFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const privateKey = req.params.privateKey;
            const findFile = yield FileService_1.FileService.findFilePrivateKey(privateKey);
            if (!findFile)
                return res.status(404).json({
                    success: false,
                    message: "File not found",
                });
            try {
                if (findFile.uploadType === "local") {
                    const filePath = path_1.default.join(__dirname, "../../" + findFile.path);
                    if (!fs_1.default.existsSync(filePath)) {
                        return res.status(404).send("File not found");
                    }
                    FileService_1.FileService.removeFile(privateKey);
                    fs_1.default.unlinkSync(filePath);
                    return res.status(200).json({ message: "File deleted successfully" });
                }
                (0, awsUpload_1.awsS3remover)(findFile.path);
                FileService_1.FileService.removeFile(privateKey);
                return res.status(200).json({ message: "File deleted successfully" });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message,
                });
            }
        });
    },
};
//# sourceMappingURL=file.controller.js.map