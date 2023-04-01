import https from "https";
import http from "http";
import fs from "fs";
import { Readable } from "stream";
export const readFromRemoteUrl = async (url: string) => {
  // Determine if the URL is using the HTTP or HTTPS protocol
  const protocol = (await url.startsWith("https")) ? https : http;

  return new Readable({
    read(size) {
      protocol.get(url, (res) => {
        res.on("data", (chunk) => {
          this.push(chunk);
        });
        res.on("end", () => {
          this.push(null);
        });
      });
    },
  });
};
