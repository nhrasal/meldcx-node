import request from "supertest";

import app from "../src/app";

let keys: any = {};

describe("File Sharing API Server", () => {
  test("should upload a file and return a public and private key", async () => {
    const filePath = `${__dirname}/file.jpg`;
    const res: any = await request(app).post("/files").attach("file", filePath);
    keys = await res.body;
    expect(res.body).toHaveProperty("publicKey");
    expect(res.body).toHaveProperty("privateKey");
  });

  test("should download a file using the public key", async () => {
    if (keys?.publicKey) {
      const res: any = await request(app)
        .get("/files/" + keys.publicKey)
        .expect("Content-Type", "image/jpeg");
    }
  });

  test("should delete a file using the private key", async () => {
    if (keys.privateKey) {
      const res: any = await request(app).delete("/files/" + keys.privateKey);
      expect(res.body).toHaveProperty("message", "File deleted successfully");
    }
  });
});
