"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const ENV_config_1 = require("./ENV.config");
const app_1 = __importDefault(require("./app"));
const FileService_1 = require("./fileStorage/FileService");
// Start the API server
app_1.default.listen(ENV_config_1.ENV.PORT, () => {
    console.log(`Server listening on port ${ENV_config_1.ENV.PORT}`);
});
// cron job for every second
node_cron_1.default.schedule("0 */1 * * * *", () => {
    FileService_1.FileService.cleanupInactiveFiles();
});
//# sourceMappingURL=index.js.map