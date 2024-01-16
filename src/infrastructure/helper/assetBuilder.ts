import { IConfigManager } from "@/infrastructure/adapter/configManager"

export interface IAssetBuilder {
  buildAssetUri(assetPath: string): Promise<string>
}

export default class AssetBuilder implements IAssetBuilder {
  constructor(private configManager: IConfigManager) { }
  public async buildAssetUri(assetPath: string): Promise<string> {
    if (assetPath.startsWith("http")) return assetPath
    return `${await this.configManager.get("CMS_ENDPOINT")}${assetPath}`
  }
}
