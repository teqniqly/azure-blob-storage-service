import { BlobServiceClient } from "@azure/storage-blob";
import { IBlobClient } from "../abstractions/blob-client";
import { IBlobContainer } from "../abstractions/blob-container";
import { AzureBlobContainer } from "./azure-blob-container";

export class AzureBlobClient implements IBlobClient {
  constructor(private client: BlobServiceClient) {

  }
  public async getContainerAsync(containerName: string): Promise<IBlobContainer> {
    const containerClient = await this.client.getContainerClient(containerName);
    return new Promise<IBlobContainer>((resolve) => resolve(new AzureBlobContainer(containerClient)));
  }

}
