import "highlight.js/styles/vs2015.css";

import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import csharp from "highlight.js/lib/languages/csharp";
import javascript from "highlight.js/lib/languages/javascript";
import shell from "highlight.js/lib/languages/shell";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("sh", shell);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("cs", csharp);
hljs.registerLanguage("xml", xml);

export default function highlightMarkdown(text: string, lang: string): string {
  if (hljs.getLanguage(lang) !== undefined) {
    try {
      return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(text, { language: lang }).value}</code></pre>`;
    } catch (__) {
      return "";
    }
  }

  return "";
}
