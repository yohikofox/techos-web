import Post from '@/business/model/post'
import styles from './post-details.module.scss'
import md from "markdown-it";
import highlightMarkdown from '@/utils/helper/highlightMarkdown';
import Metadata from './parts/Metadata';
import getReadingTime from '@/utils/helper/getReadingTime';
import { IConfigManager } from '@/business/infrastructure/adapter/configManager';
import Container from '@/business/dependencyFactory';



export interface PostDetailsProps {
  post: Post
}

export default async function PostDetails({ post }: PostDetailsProps) {

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
  const readingTime = getReadingTime(post.content)
  return (
    <>
      <section className={styles.container}>
        <Metadata
          author={post.author}
          slug={post.slug}
          start_at={post.start_at}
          readingTime={readingTime} />
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: m.render(post.content) }} />
      </section>
    </>
  )
}