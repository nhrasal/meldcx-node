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
exports.FileService = void 0;
const fs_1 = __importDefault(require("fs"));
const ENV_config_1 = require("../ENV.config");
const awsUpload_1 = require("./awsUpload");
const filePath = "./src/fileStorage/files.json";
exports.FileService = {
    getFiles() {
        try {
            const fileString = fs_1.default.readFileSync(filePath);
            return fileString ? JSON.parse(fileString) : [];
        }
        catch (err) {
            return [];
        }
    },
    writeFiles(data) {
        const files = this.getFiles() || [];
        files.push(data);
        fs_1.default.writeFileSync(filePath, JSON.stringify(files));
        return "ok";
    },
    findFilePublicKey(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = (yield this.getFiles()) || [];
            const findFile = yield files.find((file) => {
                if (file.publicKey === publicKey) {
                    return file;
                }
            });
            if (findFile)
                return yield findFile;
        });
    },
    readUpdateFile(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = (yield this.getFiles()) || [];
            const updatedFile = yield files.map((file) => file.publicKey === publicKey
                ? Object.assign(Object.assign({}, file), { updatedAt: new Date().toISOString() }) : file);
            fs_1.default.writeFileSync(filePath, JSON.stringify(updatedFile));
        });
    },
    findFilePrivateKey(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = (yield this.getFiles()) || [];
            const findFile = yield files.find((file) => {
                if (file.privateKey === privateKey)
                    return file;
            });
            if (findFile)
                return findFile;
            return null;
        });
    },
    removeFile(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = (yield this.getFiles()) || [];
            const fileUpdate = files.filter((file) => file.privateKey !== privateKey);
            fs_1.default.writeFileSync(filePath, JSON.stringify(fileUpdate));
            return "ok";
        });
    },
    cleanupInactiveFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = (yield this.getFiles()) || [];
            const now = new Date();
            const inactiveTime = +ENV_config_1.ENV.CLEANING_PERIOD_IN_DAY * 24 * 60 * 60 * 1000; // convert days to milliseconds
            files.forEach((file) => {
                const stats = fs_1.default.statSync(file.path);
                // const lastModified = new Date(stats.mtime);
                const lastModified = new Date((file === null || file === void 0 ? void 0 : file.updatedAt) || file.createdAt);
                const timeDiff = now.getTime() - lastModified.getTime();
                if (timeDiff > inactiveTime) {
                    if (file.uploadType === "local") {
                        exports.FileService.removeFile(file.privateKey);
                        fs_1.default.unlinkSync(file.path);
                    }
                    else {
                        exports.FileService.removeFile(file.privateKey);
                        (0, awsUpload_1.awsS3remover)(file.path);
                    }
                }
            });
        });
    },
};
//# sourceMappingURL=FileService.js.map