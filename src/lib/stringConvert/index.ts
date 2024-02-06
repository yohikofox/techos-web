export interface IStringConvert {
  toBase64(str: string): string;
  fromBase64(str: string, encoding?: BufferEncoding): string;
  fromBase64ToByteArray(str: string): Buffer;
}
export default class StringConvert implements IStringConvert {
  toBase64(str: string): string {
    return Buffer.from(str).toString("base64");
  }
  fromBase64(str: string, encoding?: BufferEncoding | undefined): string {
    return Buffer.from(str, "base64").toString(encoding ?? "utf-8");
  }
  fromBase64ToByteArray(str: string): Buffer {
    return Buffer.from(str, "base64");
  }

  private static _instance: StringConvert;

  public static get instance() {
    if (this._instance === undefined) {
      this._instance = new StringConvert();
    }
    return this._instance;
  }

  static toBase64(str: string): string {
    return this.instance.toBase64(str);
  }

  static fromBase64(str: string, encoding?: BufferEncoding): string {
    return this.instance.fromBase64(str, encoding);
  }

  static fromBase64ToByteArray(str: string) {
    return this.instance.fromBase64ToByteArray(str);
  }
}
