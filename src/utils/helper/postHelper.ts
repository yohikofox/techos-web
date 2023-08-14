import { parseFragment } from "parse5"

const levelMapping: { [key: string]: string } = {
  'beginner': 'Débutant',
  'confirmed': 'Confirmé',
  'expert': 'Expert',
}



export default class PostHelper {
  private static __ABSTRACT_SIZE: number = 300

  public static getLevel(level: string): string | undefined {
    return level == 'basic' ? undefined : levelMapping[level]
  }

  private static extractFromFragment(parent: any, limit: number = this.__ABSTRACT_SIZE): any {
    let result: any[] = []

    if (parent.childNodes?.length > 0) {
      for (let child of parent.childNodes) {
        result = result.concat(this.extractFromFragment(child))
      }
    } else {
      switch (parent.nodeName) {
        case '#text':
          result.push(parent.value)
        default:
          break
      }
    }

    return result
  }

  public static getExtract(extract: string): string | undefined {
    const toto = parseFragment(extract)

    const resultFragments: any[] = this.extractFromFragment(toto)

    let res = '';
    let shorted = false;

    for (let item of resultFragments) {
      const parts = item.split(' ')
      for (let part of parts) {
        if ((res.length + part.length) >= this.__ABSTRACT_SIZE) {
          shorted = true
          break
        }

        res += part + ' ';
        continue;
      }
    }

    res = res.trim()
    res = res.replace(/\n/g, '<br />')

    shorted && (res += ' ...')

    return !extract ? undefined : res
  }
}