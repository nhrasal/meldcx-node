"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config();
exports.ENV = {
    PORT: process.env.PORT,
    FOLDER: process.env.FOLDER || path_1.default.join(__dirname, "files"),
    DOWNLOAD_LIMIT_PER_DAY: process.env.DOWNLOAD_LIMIT_PER_DAY || 20,
    UPLOAD_LIMIT_PER_DAY: process.env.UPLOAD_LIMIT_PER_DAY || 20,
    PROVIDER: process.env.PROVIDER || "local",
    CLEANING_PERIOD_IN_DAY: process.env.CLEANING_PERIOD_IN_DAY || 1,
    // aws
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_PREFIX_URL: process.env.AWS_PREFIX_URL,
    AWS_PREFIX_URL_REMOVE: process.env.AWS_PREFIX_URL_REMOVE,
};
//# sourceMappingURL=ENV.config.js.map