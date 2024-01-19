import classNames from "classnames"
import styles from "./render-markdown.module.scss"
import md from "markdown-it";
import highlightMarkdown from '@/infrastructure/helper/highlightMarkdown';
import MicroPostPage from '@/app/(main)/tips/[slug]/page';
import { IConfigManager } from '@/infrastructure/adapter/configManager';
import TextToSpeechButton from "../TextToSpeechButton";
import { IOC } from "R/src/infrastructure/container";
import { convert } from "html-to-text"
import ReplaceComponentHelper, { ComponentDefinition } from "R/src/infrastructure/helper/replaceComponents";
import WrappedMicroPostCard from "../../flux/MicroPostList/_parts/WrappedMicroPostCard";

export interface RenderMarkdownProps {
  content: string
  className?: string
}

export default async function RenderMarkdown({ content, className }: RenderMarkdownProps) {

  const configManager = await IOC().resolve<IConfigManager>("ConfigManager")
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
  let ctnt = m.render(content)

  const componentDefinitions = ReplaceComponentHelper.extractAndSplit(ctnt)

  const tts = convert(ctnt).replaceAll('>', '')

  return (
    <>
      {(content) && (
        <div className={styles.speech}>
          <TextToSpeechButton
            identifier={""}
            className={styles.read__button}
            text={tts}
          />
        </div>
      )}

      {componentDefinitions.map((componentDefinition, index) => {
        if (typeof componentDefinition !== 'string')
          return (
            <div key={index} className={styles.micro__post__wrapper}>
              {(componentDefinition satisfies ComponentDefinition[]).map((cd, cdIndex) => {
                switch (cd.resourceType) {
                  case 'micro-post':
                    return <WrappedMicroPostCard key={cdIndex} slug={cd.value} />
                  default: return
                }
              })}
            </div>
          )

        return (
          <div className={classNames(styles.content, className)} key={index} dangerouslySetInnerHTML={{ __html: componentDefinition }} />
        )
      })}
    </>
  )
}