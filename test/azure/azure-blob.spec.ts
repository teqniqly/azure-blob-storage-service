import * as chai from "chai";
import * as _ from "lodash";
import "mocha";

import { IBlobClient } from "../../src/abstractions/blob-client";
import { IBlobContainer } from "../../src/abstractions/blob-container";
import { AzureBlobClientFactory } from "../../src/azure/azure-blob-client-factory";

const expect = chai.expect;

describe("Azure blob storage integration tests", () => {
  let blobClient: IBlobClient;
  let container: IBlobContainer;

  const connectionString: string = "AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;";
  const containerName = "azure-blob-storage-service";
  const blobPath = "root/l1/l2/l3/data.json";
  const blobContentObj = {name: "foo", age: 44};

  before(async () => {
    blobClient = await new AzureBlobClientFactory().createClientAsync({connectionString});
    container = await blobClient.getContainerAsync(containerName);
    const containerExists = await container.existsAsync();

    expect(containerExists).to.eq(false);
  });

  it("creates the container", async () => {
    const response = await blobClient.createContainerAsync(containerName);
    const containerExists = await container.existsAsync();

    expect(containerExists).to.eq(true);
    expect(response.date).to.not.eq(undefined);
    expect(response.etag).to.not.eq(undefined);
    expect(response.requestId).to.not.eq(undefined);
    expect(response.lastModified).to.not.eq(undefined);
  });

  it("uploads a blob to storage", async () => {
    const content = JSON.stringify(blobContentObj);
    const response = await container.uploadStringAsync(blobPath, content);

    expect(response.date).to.not.eq(undefined);
    expect(response.etag).to.not.eq(undefined);
    expect(response.requestId).to.not.eq(undefined);
    expect(response.lastModified).to.not.eq(undefined);
  });

  it("lists the blobs in the folder", async () => {
    const response = await container.listBlobsAsync({prefix: "root/l1/l2/l3"});

    expect(response.length).to.eq(1);
    expect(response[0].name).to.eq(blobPath);
  });

  it("downloads the uploaded blob from storage", async () => {
    const response = await container.downloadStringAsync(blobPath);

    expect(JSON.parse(response.data)).to.deep.eq(blobContentObj);
    expect(response.date).to.not.eq(undefined);
    expect(response.etag).to.not.eq(undefined);
    expect(response.requestId).to.not.eq(undefined);
    expect(response.lastModified).to.not.eq(undefined);
  });

  it("deletes the uploaded blob from storage", async () => {
    const response = await container.deleteBlobAsync(blobPath);

    expect(response.date).to.not.eq(undefined);
    expect(response.requestId).to.not.eq(undefined);
  });
});
