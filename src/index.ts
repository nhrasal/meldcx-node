import cron from "node-cron";
import { ENV } from "./ENV.config";
import app from "./app";
import { FileService } from "./fileStorage/FileService";
// Start the API server
app.listen(ENV.PORT, () => {
  console.log(`Server listening on port ${ENV.PORT}`);
});
// cron job for every second
cron.schedule("0 */1 * * * *", () => {
  FileService.cleanupInactiveFiles();
});
