import { renderToString } from "react-dom/server"

export type ComponentDefinition = {
  raw: string
  resourceType: string
  parameter: string
  value: string
}

export interface IReplaceComponentHelper {
}

export default class ReplaceComponentHelper implements IReplaceComponentHelper {
  private static regex = /<!-- \[\[ (.*?)\|(.*?):(.*?) \]\] -->/g;

  public static extract(str: string): ComponentDefinition[] {
    const matchAll = str.matchAll(this.regex);
    const results = []
    for (const match of matchAll) {
      results.push({
        raw: match[0].trim(),
        resourceType: match[1].trim(),
        parameter: match[2].trim(),
        value: match[3].trim()
      })
    }

    return results
  }

  public static extractAndSplit(str: string): (string | ComponentDefinition[])[] {
    const matchs = this.extract(str)

    let res = str
    const splitKeys: string[] = []
    matchs.forEach((m, index) => {
      const splitKey = `[SPLIT:${index}]`;
      res = res.replaceAll(m.raw, splitKey)
      splitKeys.push(splitKey)
    })

    let parts: (string | ComponentDefinition)[] = [res]


    for (let keyIndex = 0; keyIndex < splitKeys.length; keyIndex++) {

      const k = splitKeys[keyIndex]
      let newParts = []
      let cuts: ComponentDefinition[] = []
      for (const p of parts) {

        if (typeof p !== "string") {
          newParts.push(p)
          continue
        }

        const split = p.split(k)

        for (let i = 0; i < split.length; i++) {
          newParts.push(split[i])
          if (i % 2 === 0 && i < split.length - 1) {
            newParts.push(matchs[keyIndex])
          }
        }

        // split.forEach((s, index) => {
        //   if (index % 2 !== 0)
        //     newParts.push(matchs[index])
        // })
      }
      parts = newParts
    }

    const definedParts = parts.filter(p => !!p)

    const returnParts: (string | ComponentDefinition[])[] = []

    let currentType = -1
    let partsIndex = -1

    definedParts.forEach((p) => {
      if (typeof p === "string") {
        if (p.replaceAll('\n', '').trim().length > 0) {
          currentType = 0
          returnParts.push(p)
        }
      } else {
        if (currentType === 1) {
          (returnParts[partsIndex] as ComponentDefinition[]).push(p)
        } else if (currentType === 0) {
          returnParts.push([p])
          partsIndex = returnParts.length - 1
        }
        currentType = 1

      }
    })

    return returnParts
  }

  public static async replaceAll(str: string, componentDefinition: ComponentDefinition[], componentMapping: Record<string, (props: any) => Promise<string>>): Promise<string> {
    let res = str

    for (const c of componentDefinition) {
      const { raw, resourceType, parameter, value } = c
      const fnc = componentMapping[resourceType]
      const props = { [parameter]: value }
      const component = await fnc(props)
      const html = component
      res = res.replace(raw, html)
    }

    return res
  }
}