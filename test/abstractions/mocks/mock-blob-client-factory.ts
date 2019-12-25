import { IBlobClient } from "../../../src/abstractions/blob-client";
import { IBlobClientFactory } from "../../../src/abstractions/blob-client-factory";
import { IBlobClientSettings } from "../../../src/abstractions/blob-client-settings";
import { MockBlobContainer } from "./mock-blob-container";

export class MockBlobClientFactory implements IBlobClientFactory {
  public create(settings: IBlobClientSettings): IBlobClient {
    return {
      getContainer: () => new MockBlobContainer(),
    };
  }
}
