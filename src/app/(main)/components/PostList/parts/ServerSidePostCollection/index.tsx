import Meta from "@domain/meta";
import { FacetedSearch, SearchItem } from "@domain/search";

import PostCard from "../../../PostCard";
import FacetCollection from "../FacetCollection";
import Pagination from "../Pagination";
import styles from "./styles.module.scss";

export interface ServerSidePostCollectionProps {
  posts: SearchItem[];
  facets?: FacetedSearch[];
  meta?: Meta;
}

export default function Component({
  posts,
  facets,
  meta,
}: ServerSidePostCollectionProps) {
  return (
    <>
      <section className={styles.container}>
        {facets && (
          <FacetCollection className={styles.facet__list} data={facets} />
        )}
        <section className={styles.post__list}>
          {posts.map((post, index) => {
            return (
              <PostCard
                key={`post-list-item-${index}`}
                post={post}
                index={index}
              />
            );
          })}
          {meta && <Pagination {...meta.pagination} pathPrefix="posts" />}
        </section>
      </section>
    </>
  );
}
