import { IBlobContainer } from "./blob-container";

export interface IBlobClient {
  getContainer(): IBlobContainer;
}
