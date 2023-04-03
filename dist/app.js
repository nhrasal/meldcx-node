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
const express_1 = __importDefault(require("express"));
const FS = __importStar(require("fs"));
const ENV_config_1 = require("./ENV.config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes"));
const utils_1 = require("./utils");
const uploadDownload_middlewares_1 = require("./middlewares/uploadDownload.middlewares");
const app = (0, express_1.default)();
if ((0, utils_1.isInvalidEnvConfigured)()) {
    console.log("🚀 Please configured your .env file and given variable");
    process.exit(1);
}
if (!FS.existsSync("src/fileStorage/files.json")) {
    FS.writeFileSync("src/fileStorage/files.json", "[]");
}
if (!FS.existsSync(ENV_config_1.ENV.FOLDER)) {
    FS.mkdirSync(ENV_config_1.ENV.FOLDER, { recursive: true });
}
// Middleware for enforcing daily download and upload limits per IP address
app.use(uploadDownload_middlewares_1.Middleware);
app.use(routes_1.default);
app.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(utils_1.swaggerSpec));
exports.default = app;
//# sourceMappingURL=app.js.map