import { IBlobContainer } from "./blob-container";
import { ICreateContainerResponse } from "./create-container-response";

export interface IBlobClient {
  getContainerAsync(containerName: string): Promise<IBlobContainer>;
  createContainerAsync(containerName: string): Promise<ICreateContainerResponse>;
}
