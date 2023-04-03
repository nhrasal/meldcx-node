"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const ENV_config_1 = require("../ENV.config");
const downloadLimits = new Map();
const uploadLimits = new Map();
const Middleware = (req, res, next) => {
    const route = req.url.split("/");
    if (!route.includes("files"))
        return next();
    const ip = req.ip;
    const today = new Date().toISOString().slice(0, 10);
    const downloadCount = downloadLimits.get(`${ip}-${today}`) || 0;
    const uploadCount = uploadLimits.get(`${ip}-${today}`) || 0;
    if (downloadCount >= ENV_config_1.ENV.DOWNLOAD_LIMIT_PER_DAY &&
        req.method.toLowerCase() === "get") {
        return res.status(429).json({
            success: false,
            message: "Daily download limit reached",
        });
    }
    if (uploadCount >= ENV_config_1.ENV.UPLOAD_LIMIT_PER_DAY &&
        req.method.toLowerCase() === "post") {
        return res.status(429).json({
            success: false,
            message: "Daily upload limit reached",
        });
    }
    if (req.method.toLowerCase() === "post")
        uploadLimits.set(`${ip}-${today}`, uploadCount + 1);
    if (req.method.toLowerCase() === "get")
        downloadLimits.set(`${ip}-${today}`, downloadCount + 1);
    next();
};
exports.Middleware = Middleware;
//# sourceMappingURL=uploadDownload.middlewares.js.map