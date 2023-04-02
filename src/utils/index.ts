import https from "https";
import http from "http";
import { Readable } from "stream";
import { ENV } from "../ENV.config";
import swaggerJSDoc from "swagger-jsdoc";

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

export const isInvalidEnvConfigured = () => {
  if (!ENV.PORT) {
    console.log(
      "💔 please add PORT variable on .env file and restart the application."
    );
    return true;
  }
  if (!ENV.FOLDER) {
    console.log(
      "💔 please add FOLDER variable on .env file and restart the application."
    );
    return;
  }
  if (!ENV.DOWNLOAD_LIMIT_PER_DAY) {
    console.log(
      "💔 please add DOWNLOAD_LIMIT_PER_DAY variable on .env file and restart the application."
    );
    return true;
  }
  if (!ENV.UPLOAD_LIMIT_PER_DAY) {
    console.log(
      "💔 please add UPLOAD_LIMIT_PER_DAY variable on .env file and restart the application."
    );
    return true;
  }
  if (!ENV.PROVIDER) {
    console.log(
      "💔 please add PROVIDER variable on .env file and restart the application."
    );
    return true;
  }

  if (!ENV.CLEANING_PERIOD_IN_DAY) {
    console.log(
      "💔 please add CLEANING_PERIOD_IN_DAY variable on .env file and restart the application."
    );
    return true;
  }
  if (ENV.PROVIDER !== "local") {
    if (!ENV.AWS_ACCESS_KEY_ID) {
      console.log(
        "💔 please add AWS_ACCESS_KEY_ID variable on .env file and restart the application."
      );
      return true;
    }
    if (!ENV.AWS_SECRET_ACCESS_KEY) {
      console.log(
        "💔 please add AWS_SECRET_ACCESS_KEY variable on .env file and restart the application."
      );
      return true;
    }
    if (!ENV.AWS_REGION) {
      console.log(
        "💔 please add AWS_REGION variable on .env file and restart the application."
      );
      return true;
    }
    if (!ENV.AWS_BUCKET_NAME) {
      console.log(
        "💔 please add AWS_BUCKET_NAME variable on .env file and restart the application."
      );
      return true;
    }
    if (!ENV.AWS_PREFIX_URL) {
      console.log(
        "💔 please add AWS_PREFIX_URL variable on .env file and restart the application."
      );
      return true;
    }
    if (!ENV.AWS_PREFIX_URL_REMOVE) {
      console.log(
        "💔 please add AWS_PREFIX_URL_REMOVE variable on .env file and restart the application."
      );
      return true;
    }
  }
  return false;
};

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
