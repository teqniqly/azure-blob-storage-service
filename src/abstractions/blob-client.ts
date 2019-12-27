import { IBlobContainer } from "./blob-container";
import { ICreateContainerResponse } from "./create-container-response";
import { IDeleteContainerResponse } from "./delete-container-response";

export interface IBlobClient {
  getContainerAsync(containerName: string): Promise<IBlobContainer>;
  createContainerAsync(containerName: string): Promise<ICreateContainerResponse>;
  deleteContainerAsync(containerName: string): Promise<IDeleteContainerResponse>;
}
