import { FacetedSearch, SearchItem } from "R/src/domain/search"
import TextToSpeechInfos from "../../../TextToSpeechInfos"
import FacetCollection from "../FacetCollection"
import styles from "./styles.module.scss"
import PostCard from "../../../PostCard"
import Pagination from "../Pagination"

export interface ServerSidePostCollectionProps {
  posts: SearchItem[]
  facets?: FacetedSearch[],
  meta?: any
}

export default function Component({ posts, facets, meta }: ServerSidePostCollectionProps) {
  return (
    <>
      <section className={styles.container}>
        <TextToSpeechInfos />
        {facets && <FacetCollection className={styles.facet__list} data={facets} />}
        <section className={styles.post__list}>
          {posts.map((post, index) => {
            return (
              <PostCard key={`post-list-item-${index}`} post={post} index={index} />
            )
          })}
          {meta && <Pagination {...meta.pagination} pathPrefix="posts" />}
        </section>
      </section>
    </>
  )
}