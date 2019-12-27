import { IBlobContainer } from "./blob-container";

export interface IBlobClient {
  getContainerAsync(containerName: string): Promise<IBlobContainer>;
}
