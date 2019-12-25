import { IBlobContainer } from "../../../src/abstractions/blob-container";
import { IBlobContainerListOptions } from "../../../src/abstractions/blob-container-list-options";
import { IDownloadResponse } from "../../../src/abstractions/download-response";
import { IUploadResponse } from "../../../src/abstractions/upload-response";

export class MockBlobContainer implements IBlobContainer {
  public uploadString(value: string): IUploadResponse {
    return {} as IUploadResponse;
  }

  public exists(): boolean {
    return true;
  }

  public listBlobs(options: IBlobContainerListOptions): any {
    return {};
  }

  public downloadString(path: string): IDownloadResponse {
    return {} as IDownloadResponse;
  }
}
