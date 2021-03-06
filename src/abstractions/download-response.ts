export interface IDownloadResponse {
  readonly data: string;
  readonly etag: string;
  readonly lastModified: Date;
  readonly requestId: string;
  readonly date: Date;
}
