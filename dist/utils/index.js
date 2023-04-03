"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInvalidEnvConfigured = exports.swaggerSpec = exports.SwggrOptions = exports.swaggerDefinition = void 0;
const ENV_config_1 = require("../ENV.config");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "File Sharing API",
        version: "1.0.0",
        description: "Simple file upload download and remove",
    },
    servers: [
        {
            url: "http://localhost:" + ENV_config_1.ENV.PORT,
            description: "Development server",
        },
    ],
};
exports.SwggrOptions = {
    swaggerDefinition: exports.swaggerDefinition,
    // Path to the API docs
    apis: [`${__dirname}/routes/index.ts`, "./dist/routes/index.js"],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(exports.SwggrOptions);
const isInvalidEnvConfigured = () => {
    if (!ENV_config_1.ENV.PORT) {
        console.log("💔 please add PORT variable on .env file and restart the application.");
        return true;
    }
    if (!ENV_config_1.ENV.FOLDER) {
        console.log("💔 please add FOLDER variable on .env file and restart the application.");
        return;
    }
    if (!ENV_config_1.ENV.DOWNLOAD_LIMIT_PER_DAY) {
        console.log("💔 please add DOWNLOAD_LIMIT_PER_DAY variable on .env file and restart the application.");
        return true;
    }
    if (!ENV_config_1.ENV.UPLOAD_LIMIT_PER_DAY) {
        console.log("💔 please add UPLOAD_LIMIT_PER_DAY variable on .env file and restart the application.");
        return true;
    }
    if (!ENV_config_1.ENV.PROVIDER) {
        console.log("💔 please add PROVIDER variable on .env file and restart the application.");
        return true;
    }
    if (!ENV_config_1.ENV.CLEANING_PERIOD_IN_DAY) {
        console.log("💔 please add CLEANING_PERIOD_IN_DAY variable on .env file and restart the application.");
        return true;
    }
    if (ENV_config_1.ENV.PROVIDER !== "local") {
        if (!ENV_config_1.ENV.AWS_ACCESS_KEY_ID) {
            console.log("💔 please add AWS_ACCESS_KEY_ID variable on .env file and restart the application.");
            return true;
        }
        if (!ENV_config_1.ENV.AWS_SECRET_ACCESS_KEY) {
            console.log("💔 please add AWS_SECRET_ACCESS_KEY variable on .env file and restart the application.");
            return true;
        }
        if (!ENV_config_1.ENV.AWS_REGION) {
            console.log("💔 please add AWS_REGION variable on .env file and restart the application.");
            return true;
        }
        if (!ENV_config_1.ENV.AWS_BUCKET_NAME) {
            console.log("💔 please add AWS_BUCKET_NAME variable on .env file and restart the application.");
            return true;
        }
        if (!ENV_config_1.ENV.AWS_PREFIX_URL) {
            console.log("💔 please add AWS_PREFIX_URL variable on .env file and restart the application.");
            return true;
        }
        if (!ENV_config_1.ENV.AWS_PREFIX_URL_REMOVE) {
            console.log("💔 please add AWS_PREFIX_URL_REMOVE variable on .env file and restart the application.");
            return true;
        }
    }
    return false;
};
exports.isInvalidEnvConfigured = isInvalidEnvConfigured;
// export const readFromRemoteUrl = async (url: string) => {
//   // Determine if the URL is using the HTTP or HTTPS protocol
//   const protocol = (await url.startsWith("https")) ? https : http;
//   return new Readable({
//     read(size) {
//       protocol.get(url, (res) => {
//         res.on("data", (chunk) => {
//           this.push(chunk);
//         });
//         res.on("end", () => {
//           this.push(null);
//         });
//       });
//     },
//   });
// };
//# sourceMappingURL=index.js.map