import * as FS from "fs";
import * as AWS from "aws-sdk";
import { ENV } from "../ENV.config";

export const awsS3uploader = (file: any, folderName?: string) => {
  AWS.config.update({
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    region: ENV.AWS_REGION,
    signatureVersion: "v4",
  });

  // Set an endpoint.
  const ep = new AWS.Endpoint(ENV.AWS_PREFIX_URL);

  // Create an S3 client
  const s3 = new AWS.S3({ signatureVersion: "v4", endpoint: ep });
  return s3
    .upload({
      ACL: "public-read",
      Bucket: ENV.AWS_BUCKET_NAME,
      Body: FS.createReadStream(file.path),
      Key: `${folderName}/${generateFilename(file)}`,
      ContentType: file.mimetype,
    })
    .promise();
};

export const awsS3remover = (imgPath: string) => {
  const ep = new AWS.Endpoint(ENV.AWS_PREFIX_URL);
  // Create an S3 client
  const s3 = new AWS.S3({ signatureVersion: "v4", endpoint: ep });
  s3.createBucket(
    {
      Bucket: ENV.AWS_BUCKET_NAME,
    },
    () => {
      const params = {
        Bucket: ENV.AWS_BUCKET_NAME,
        Key: imgPath.split(ENV.AWS_PREFIX_URL_REMOVE).pop(),
      };
      s3.deleteObject(params, (err, data) => {
        if (err) return err;
        return data;
      });
    }
  );
};

export const generateFilename = (file: any, prefix = "meldcx-") => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `${prefix + uniqueSuffix + file.originalname}`;
};
