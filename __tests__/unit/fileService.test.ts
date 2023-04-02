import { FileService } from "./../../src/fileStorage/FileService";
const data = {
  publicKey: "0a25d7d0032c680c8fd7904b12649dd99d3ebe36",
  privateKey: "49150960ee9da3e431e5eb9790f0fe33",
  name: "1680362966574-c9d80a65ac.jpeg",
  mimeType: "image/jpeg",
  size: 11908,
  path: "files/1680362966574-c9d80a65ac.jpeg",
  uploadType: "local",
  isActive: true,
  createdAt: "2023-04-01T15:29:26.577Z",
  updatedAt: "2023-04-02T05:55:15.913Z",
};
describe("File service testing", () => {
  test("Create file information", () => {
    var result = FileService.writeFiles(data); // assert
    expect(result).toBe("ok");
  });

  test("Find file using publicKey", async () => {
    var result = await FileService.findFilePublicKey(data.publicKey); // assert
    expect(result).toStrictEqual(data);
  });

  test("Find file using privateKey", async () => {
    var result = await FileService.findFilePrivateKey(data.privateKey); // assert
    expect(result).toStrictEqual(data);
  });

  test("Remove file information", async () => {
    var result = await FileService.removeFile(data.privateKey); // assert
    expect(result).toBe("ok");
  });
});
