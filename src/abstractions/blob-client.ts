import { IBlobContainer } from "./blob-container";

export interface IBlobClient {
  getContainer(containerName: string): IBlobContainer;
}
