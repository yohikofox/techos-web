import jwt from "jsonwebtoken";
import { IConfigManager } from "../adapter/configManager";
import crypto from "crypto"

export interface ITokenGenerator {
  generateToken<T>(data: T): Promise<string>;
  createKeyPair(): Promise<{
    publicKey: string,
    privateKey: string
  }>;
}

export default class TokenGenerator implements ITokenGenerator {
  constructor(private configManager: IConfigManager) { }

  public async createKeyPair(): Promise<{
    publicKey: string,
    privateKey: string
  }> {

    const ppk = crypto.generateKeyPairSync('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    })

    return {
      publicKey: ppk.publicKey,
      privateKey: ppk.privateKey
    }
  }

  public async generateToken<T>(data: T): Promise<string> {
    const privateKey = await this.configManager.get("JWT_PRIVATE_KEY");

    if (privateKey === undefined || privateKey === null) throw new Error("JWT_PRIVATE_KEY not found in config");

    return jwt.sign({
      data: data
    }, privateKey, { expiresIn: '1h' });
  }

  public async digestToken<T>(token: string): Promise<T> {
    const privateKey = await this.configManager.get("JWT_PRIVATE_KEY");

    if (privateKey === undefined || privateKey === null) throw new Error("JWT_PRIVATE_KEY not found in config");

    const decoded = jwt.decode(token, { complete: true })

    if (decoded === null) throw new Error("Token is invalid")

    const payload = decoded.payload

    console.log('payload:', payload)

    return payload as T
  }
}