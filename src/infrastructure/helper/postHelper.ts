import { parseFragment } from "parse5";

const levelMapping: { [key: string]: string } = {
  beginner: "Débutant",
  confirmed: "Confirmé",
  expert: "Expert",
};

type Node = {
  childNodes?: Node[];
  nodeName?: string;
  value?: string;
};

export default class PostHelper {
  private static __ABSTRACT_SIZE: number = 200;

  public static getLevel(level: string): string | undefined {
    return level == "basic" ? undefined : levelMapping[level];
  }

  private static extractFromFragment(parent: Node): string[] {
    let result: string[] = [];

    if (parent.childNodes !== undefined && parent.childNodes?.length > 0) {
      for (const child of parent.childNodes) {
        result = result.concat(this.extractFromFragment(child));
      }
    } else {
      switch (parent.nodeName) {
        case "#text":
          if (parent.value !== undefined) result.push(parent.value);
          break;
        default:
          break;
      }
    }

    return result;
  }

  public static getExtract(extract: string): string | undefined {
    if (extract === undefined) return undefined;

    const fragments = parseFragment(extract);

    const resultFragments: string[] = this.extractFromFragment(fragments);

    let res = "";
    let shorted = false;

    for (const item of resultFragments) {
      const parts = item.split(" ");
      for (const part of parts) {
        if (res.length + part.length >= this.__ABSTRACT_SIZE) {
          shorted = true;
          break;
        }

        res += part + " ";
        continue;
      }
    }

    res = res.trim();
    res = res.replace(/\n/g, "<br />");

    shorted && (res += " ...");

    return res;
  }
}
