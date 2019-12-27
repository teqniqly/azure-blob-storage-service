export interface IUploadResponse {
  readonly etag: string;
  readonly lastModified: Date;
  readonly requestId: string;
  readonly date: Date;
}
