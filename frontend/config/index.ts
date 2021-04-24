import config from "./config.json";

export interface Config {
  imsApiUrl: string;
  cacheMinute: number;
}

export default ((): Config => config)();
