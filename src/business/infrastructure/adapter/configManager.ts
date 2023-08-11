export interface IConfigManager {
  get(key: string): string;
}
export default class ConfigManager implements IConfigManager {
  get(key: string): string {
    throw new Error("Method not implemented.");
  }
}