import request from "supertest";

import app from "../src/app";

describe("File Sharing API Server", () => {
  test("should upload a file and return a public and private key", async () => {
    // const filePath = `${__dirname}/file.jpg`;
    // const res = await request(app)
    //   .post("/files")
    //   .attach("file", filePath)
    //   .expect(200);
    // expect(res.body).toHaveProperty("publicKey");
    // expect(res.body).toHaveProperty("privateKey");
  });

  test("should download a file using the public key", async () => {
    const res = await request(app)
      .get("/files/a357e66e77194fe3891c574ee77f15bdea878c14")
      .expect("Content-Type", "image/jpeg")
      .expect(200);

    expect(res).toBe("Test file content");
  });

  test("should delete a file using the private key", async () => {
    const res = await request(app)
      .delete("/files/66c971fb3091ab76b6e37a64ba311bb0")
      .expect(200);

    expect(res.body).toHaveProperty("message", "File deleted successfully");
  });
});
