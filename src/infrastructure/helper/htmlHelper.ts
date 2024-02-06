import { parse } from "parse5";
import dom from "xmldom";
import xmlSerializer from "xmlserializer";
import xpath from "xpath";

export type GetElementsOptions = {
  /**
   * @param element The element to filter
   * @param index The index of the element _(optional)_
   * @returns The element to be included in the result
   */
  filter?: (
    element: Node | xpath.SelectedValue,
    index: number
  ) => Node | xpath.SelectedValue;
  /**
   * @param selector The xpath selector to use
   */
  selector: string;
};

export default class HTMLHelper {
  static async getElements(
    response: Response,
    options: GetElementsOptions = {
      filter: (it: Node | xpath.SelectedValue) => it,
      selector: "//*",
    }
  ) {
    const htmlBody = await response.text();
    const parsedHtmlDocument = parse(htmlBody);

    const xhtml = xmlSerializer.serializeToString(parsedHtmlDocument as never);
    const doc = new dom.DOMParser().parseFromString(xhtml);

    const select = xpath.useNamespaces({
      x: "http://www.w3.org/1999/xhtml",
    });

    const html = select(options.selector, doc);

    const elements: Node[] | xpath.SelectedValue[] = Array.isArray(html)
      ? html
      : [html];

    return elements
      .filter(options.filter!)
      .map((link: Node | xpath.SelectedValue) => {
        if (link instanceof Element) return link.getAttribute("href");
        return undefined;
      });
  }
}
