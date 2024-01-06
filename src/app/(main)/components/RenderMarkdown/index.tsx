import classNames from "classnames"
import styles from "./render-markdown.module.scss"
import md from "markdown-it";
import highlightMarkdown from '@/infrastructure/helper/highlightMarkdown';

import { IConfigManager } from '@/infrastructure/adapter/configManager';
import Container from '@/infrastructure/dependencyFactory';
import TextToSpeechButton from "../TextToSpeechButton";

export interface RenderMarkdownProps {
  content: string
  className?: string
}

export default async function RenderMarkdown({ content, className }: RenderMarkdownProps) {

  const configManager = await Container.Instance.resolve<IConfigManager>("Helper/ConfigManager")
  const cmsEndpoint = await configManager.get('CMS_ENDPOINT')


  const m = md({
    html: true,
    highlight(str, lang, attrs) {
      return highlightMarkdown(str, lang, attrs)
    },
  })


  m.renderer.rules.image = function (tokens, idx, options, env, slf) {
    var token = tokens[idx]
    if (token && token.type === 'image' && token.attrs && token.children) {
      token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env)
      if (token.attrs[token.attrIndex('src')][1].startsWith('http')) return slf.renderToken(tokens, idx, options)
      if (token.attrs[token.attrIndex('src')][1].startsWith('/uploads')) token.attrs[token.attrIndex('src')][1] = `${cmsEndpoint}${token.attrs[token.attrIndex('src')][1]}`
      if (token.attrs[token.attrIndex('src')][1].startsWith('data:image/png;base64,')) return slf.renderToken(tokens, idx, options)

      token.attrSet('loading', 'lazy')
      return slf.renderToken(tokens, idx, options)
    }
    return ''
  }
  const ctnt = m.render(content)
  return (
    <>
      {(content) && (
        <div className={styles.speech}>
          <TextToSpeechButton
            identifier={""}
            className={styles.read__button}
            text={ctnt}
          />
        </div>
      )}
      <div className={classNames(styles.content, className)} dangerouslySetInnerHTML={{ __html: ctnt }} />
    </>
  )
}