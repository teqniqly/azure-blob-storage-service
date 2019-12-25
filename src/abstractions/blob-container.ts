import { IBlobContainerListOptions } from "./blob-container-list-options";
import { IDownloadResponse } from "./download-response";
import { IUploadResponse } from "./upload-response";

export interface IBlobContainer {
  exists(): boolean;
  uploadString(value: string): IUploadResponse;
  downloadString(path: string): IDownloadResponse;
  listBlobs(options: IBlobContainerListOptions): any;
}
