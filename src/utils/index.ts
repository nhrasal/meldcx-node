import https from "https";
import http from "http";
import fs from "fs";
import { Readable } from "stream";
import { ENV } from "../ENV.config";
import swaggerJSDoc from "swagger-jsdoc";
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

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "File Sharing API",
    version: "1.0.0",
    description: "Simple file upload download and remove",
  },
  servers: [
    {
      url: "http://localhost:" + ENV.PORT,
      description: "Development server",
    },
  ],
};

export const SwggrOptions = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${__dirname}/routes/index.ts`, "./dist/routes/index.js"],
};

export const swaggerSpec = swaggerJSDoc(SwggrOptions);
