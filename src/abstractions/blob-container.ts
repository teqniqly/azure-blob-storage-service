import { IBlob } from "./blob";
import { IBlobContainerListOptions } from "./blob-container-list-options";
import { IDeleteResponse } from "./delete-response";
import { IDownloadResponse } from "./download-response";
import { IUploadResponse } from "./upload-response";

export interface IBlobContainer {
  existsAsync(): Promise<boolean>;
  uploadStringAsync(path: string, data: string): Promise<IUploadResponse>;
  downloadStringAsync(path: string): Promise<IDownloadResponse>;
  listBlobsAsync(options: IBlobContainerListOptions): Promise<IBlob[]>;
  deleteBlobAsync(path: string): Promise<IDeleteResponse>;
}
