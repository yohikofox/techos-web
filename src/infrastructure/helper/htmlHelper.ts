import { parse } from "parse5"
import dom from "xmldom"
import xmlSerializer from "xmlserializer"
import xpath from "xpath"

export type GetElementsOptions = {
  /**
   * @param element The element to filter
   * @param index The index of the element _(optional)_
   * @returns The element to be included in the result
   */
  filter?: (element: any, index: number) => any
  /**
   * @param selector The xpath selector to use
   */
  selector: string
}

export default class HTMLHelper {
  static async getElements(response: Response, options: GetElementsOptions = {
    filter: (it: any) => it,
    selector: '//*'
  }) {
    const htmlBody = await response.text()
    const parsedHtmlDocument = parse(htmlBody)

    const xhtml = xmlSerializer.serializeToString(parsedHtmlDocument as any)
    const doc = new dom.DOMParser().parseFromString(xhtml)

    const select = xpath.useNamespaces({
      "x": "http://www.w3.org/1999/xhtml",
    })

    const html = select(options.selector, doc)

    const elements = Array.isArray(html) ? html : [html]

    return elements.filter(options.filter!).map((link: any) => {
      return link.getAttribute('href')
    })
  }
}

