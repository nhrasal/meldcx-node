"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const ENV_config_1 = require("../ENV.config");
exports.FileUpload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, ENV_config_1.ENV.FOLDER);
        },
        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const randomString = crypto_1.default.randomBytes(5).toString("hex");
            const extension = path_1.default.extname(file.originalname);
            const fileName = `${timestamp}-${randomString}${extension}`;
            cb(null, fileName);
        },
    }),
});
//# sourceMappingURL=fileUpload.js.map