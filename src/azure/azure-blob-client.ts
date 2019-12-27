import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { IBlobClient } from "../abstractions/blob-client";
import { IBlobContainer } from "../abstractions/blob-container";
import { ICreateContainerResponse } from "../abstractions/create-container-response";
import { AzureBlobContainer } from "./azure-blob-container";

export class AzureBlobClient implements IBlobClient {
  constructor(private client: BlobServiceClient) {

  }

  public async getContainerAsync(containerName: string): Promise<IBlobContainer> {
    const containerClient = await this._getContainerReference(containerName);
    return new Promise<IBlobContainer>((resolve) => resolve(new AzureBlobContainer(containerClient)));
  }

  public async createContainerAsync(containerName: string): Promise<ICreateContainerResponse> {
    const containerClient = await this._getContainerReference(containerName);
    const response = await containerClient.create();
    return new Promise<ICreateContainerResponse>((resolve) => resolve({
      date: response.date,
      etag: response.etag,
      lastModified: response.lastModified,
      requestId: response.requestId,
    } as ICreateContainerResponse));
  }

  private async _getContainerReference(containerName: string): Promise<ContainerClient> {
    const containerClient = await this.client.getContainerClient(containerName);
    return new Promise<ContainerClient>((resolve) => resolve(containerClient));
  }
}
