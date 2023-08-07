import Post from '@/business/model/post'
import styles from './post-details.module.scss'
import md from "markdown-it";
import highlightMarkdown from '@/utils/helper/highlightMarkdown';



export interface PostDetailsProps {
  post: Post
}

export default function PostDetails({ post }: PostDetailsProps) {
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
      if (token.attrs[token.attrIndex('src')][1].startsWith('/uploads')) token.attrs[token.attrIndex('src')][1] = `http://localhost:1337${token.attrs[token.attrIndex('src')][1]}`
      if (token.attrs[token.attrIndex('src')][1].startsWith('data:image/png;base64,')) return slf.renderToken(tokens, idx, options)

      // this is the line of code responsible for an additional 'loading' attribute
      token.attrSet('loading', 'lazy')
      return slf.renderToken(tokens, idx, options)
    }
    return ''
  }
  return (
    <>
      <section className={styles.container}>
        <section className={styles.metadata}></section>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: m.render(post.content) }} />
      </section>
    </>
  )
}