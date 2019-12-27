import { BlobServiceClient } from "@azure/storage-blob";
import { IBlobClient } from "../abstractions/blob-client";
import { IBlobClientFactory } from "../abstractions/blob-client-factory";
import { IBlobClientSettings } from "../abstractions/blob-client-settings";
import { AzureBlobClient } from "./azure-blob-client";

export class AzureBlobClientFactory implements IBlobClientFactory {
  public async createClientAsync(settings: IBlobClientSettings): Promise<IBlobClient> {
    const blobServiceClient = await BlobServiceClient.fromConnectionString(settings.connectionString);
    return new Promise((resolve) => resolve(new AzureBlobClient(blobServiceClient)));
  }

}
