import * as chai from "chai";
import * as _ from "lodash";
import "mocha";

import { IBlobClient } from "../../src/abstractions/blob-client";
import { IBlobClientFactory } from "../../src/abstractions/blob-client-factory";
import { IBlobContainer } from "../../src/abstractions/blob-container";
import { IBlobContainerListOptions } from "../../src/abstractions/blob-container-list-options";
import { MockBlobClientFactory } from "./mocks/mock-blob-client-factory";

const expect = chai.expect;

describe("Service classes tests", () => {
  let factory: IBlobClientFactory;
  let client: IBlobClient;
  let container: IBlobContainer;

  it("creates the blob client", () => {
    factory = new MockBlobClientFactory();

    client = factory.create({
      connectionString: "foo",
      containerName: "bar",
    });

    expect(client).to.not.eq(undefined);
  });

  it("gets a container reference", () => {
    container = client.getContainer();
    expect(container).to.not.eq(undefined);
  });

  it("gets whether the container exists", () => {
    expect(container.exists()).to.eq(true);
  });

  it("uploads a blob", () => {
    expect(container.uploadString("foo")).to.not.eq(undefined);
  });

  it("lists blobs in the container", () => {
    expect(container.listBlobs({} as IBlobContainerListOptions)).to.not.eq(undefined);
  });

  it("downloads a blob", () => {
    expect(container.downloadString("foo")).to.not.eq(undefined);
  });
});
