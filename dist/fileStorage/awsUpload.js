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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilename = exports.awsS3remover = exports.awsS3uploader = void 0;
const FS = __importStar(require("fs"));
const AWS = __importStar(require("aws-sdk"));
const ENV_config_1 = require("../ENV.config");
const awsS3uploader = (file, folderName) => {
    AWS.config.update({
        secretAccessKey: ENV_config_1.ENV.AWS_SECRET_ACCESS_KEY,
        accessKeyId: ENV_config_1.ENV.AWS_ACCESS_KEY_ID,
        region: ENV_config_1.ENV.AWS_REGION,
        signatureVersion: "v4",
    });
    // Set an endpoint.
    const ep = new AWS.Endpoint(ENV_config_1.ENV.AWS_PREFIX_URL);
    // Create an S3 client
    const s3 = new AWS.S3({ signatureVersion: "v4", endpoint: ep });
    return s3
        .upload({
        ACL: "public-read",
        Bucket: ENV_config_1.ENV.AWS_BUCKET_NAME,
        Body: FS.createReadStream(file.path),
        Key: `${folderName}/${(0, exports.generateFilename)(file)}`,
        ContentType: file.mimetype,
    })
        .promise();
};
exports.awsS3uploader = awsS3uploader;
const awsS3remover = (imgPath) => {
    const ep = new AWS.Endpoint(ENV_config_1.ENV.AWS_PREFIX_URL);
    // Create an S3 client
    const s3 = new AWS.S3({ signatureVersion: "v4", endpoint: ep });
    s3.createBucket({
        Bucket: ENV_config_1.ENV.AWS_BUCKET_NAME,
    }, () => {
        const params = {
            Bucket: ENV_config_1.ENV.AWS_BUCKET_NAME,
            Key: imgPath.split(ENV_config_1.ENV.AWS_PREFIX_URL_REMOVE).pop(),
        };
        s3.deleteObject(params, (err, data) => {
            if (err)
                return err;
            return data;
        });
    });
};
exports.awsS3remover = awsS3remover;
const generateFilename = (file, prefix = "meldcx-") => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return `${prefix + uniqueSuffix + file.originalname}`;
};
exports.generateFilename = generateFilename;
//# sourceMappingURL=awsUpload.js.map