import { IBlobClient } from "./blob-client";
import { IBlobClientSettings } from "./blob-client-settings";

export interface IBlobClientFactory  {
  createClientAsync(settings: IBlobClientSettings): Promise<IBlobClient>;
}
