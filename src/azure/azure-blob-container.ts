import { BlockBlobClient, ContainerClient, ContainerListBlobsOptions } from "@azure/storage-blob";
import { IBlob } from "../abstractions/blob";
import { IBlobContainer } from "../abstractions/blob-container";
import { IBlobContainerListOptions } from "../abstractions/blob-container-list-options";
import { IDeleteResponse } from "../abstractions/delete-response";
import { IDownloadResponse } from "../abstractions/download-response";
import { IUploadResponse } from "../abstractions/upload-response";

export class AzureBlobContainer implements IBlobContainer {
  constructor(private client: ContainerClient) {

  }

  public async existsAsync(): Promise<boolean> {
    const exists = await this.client.exists();
    return new Promise((resolve) => resolve(exists));
  }

  public async uploadStringAsync(path: string, data: string): Promise<IUploadResponse> {
    const blob = this._getBlobReference(path);
    const azureResponse = await blob.upload(data, data.length);

    return new Promise((resolve) => resolve({
      date: azureResponse.date,
      etag: azureResponse.etag,
      lastModified: azureResponse.lastModified,
      requestId: azureResponse.requestId,
    } as IUploadResponse));
  }

  public async downloadStringAsync(path: string): Promise<IDownloadResponse> {
    const blob = this._getBlobReference(path);
    const azureResponse = await blob.download(0);
    const content = await this._streamToString(azureResponse.readableStreamBody);

    return new Promise((resolve) => resolve({
      data: content,
      date: azureResponse.date,
      etag: azureResponse.etag,
      lastModified: azureResponse.lastModified,
      requestId: azureResponse.requestId,
    } as IDownloadResponse));
  }

  public async listBlobsAsync(options: IBlobContainerListOptions): Promise<IBlob[]> {
    const blobs: IBlob[] = [];

    for await (const azureBlob of this.client.listBlobsFlat(options as ContainerListBlobsOptions)) {
      blobs.push({name: azureBlob.name});
    }

    return new Promise((resolve) => resolve(blobs));
  }

  public async deleteBlobAsync(path: string): Promise<any> {
    const blob = this._getBlobReference(path);
    const azureResponse = await blob.delete();

    return new Promise((resolve) => resolve({
      date: azureResponse.date,
      requestId: azureResponse.requestId,
    } as IDeleteResponse));
  }

  private _getBlobReference(path: string): BlockBlobClient {
    return this.client.getBlockBlobClient(path);
  }

  private async _streamToString(readableStream: any) {
    return new Promise((resolve, reject) => {
      const chunks: any = [];
      readableStream.on("data", (data: any) => {
        chunks.push(data.toString());
      });
      readableStream.on("end", () => {
        resolve(chunks.join(""));
      });
      readableStream.on("error", reject);
    });
  }

}
