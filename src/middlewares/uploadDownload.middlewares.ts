import { ENV } from "../ENV.config";
import { Request, Response, NextFunction } from "express";

const downloadLimits = new Map();
const uploadLimits = new Map();

export const Middleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const today = new Date().toISOString().slice(0, 10);
  const downloadCount = downloadLimits.get(`${ip}-${today}`) || 0;
  const uploadCount = uploadLimits.get(`${ip}-${today}`) || 0;

  if (
    downloadCount >= ENV.DOWNLOAD_LIMIT_PER_DAY &&
    req.method.toLowerCase() === "get"
  ) {
    return res.status(429).json({
      success: false,
      message: "Daily download limit reached",
    });
  }
  if (
    uploadCount >= ENV.UPLOAD_LIMIT_PER_DAY &&
    req.method.toLowerCase() === "post"
  ) {
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
