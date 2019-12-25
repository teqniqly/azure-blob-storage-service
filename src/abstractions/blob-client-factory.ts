import { IBlobClient } from "./blob-client";
import { IBlobClientSettings } from "./blob-client-settings";

export interface IBlobClientFactory  {
  create(settings: IBlobClientSettings): IBlobClient;
}
