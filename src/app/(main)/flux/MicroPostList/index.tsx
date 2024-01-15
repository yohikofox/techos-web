'use client'
import MicroPost from "R/src/business/model/microPost"
import MicroPostList from "R/src/business/model/microPostList"
import useFluxStore from "R/src/infrastructure/store/flux"
import { FluxStore } from "R/src/infrastructure/store/flux/_parts/flux/flux"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import styles from "./style.module.scss"
import { Image } from "R/src/components/Image"
import Link from "next/link"

export interface MicroPostListProps {
  data: MicroPostList
}

export default function Component({ data: { posts: inputData, meta: inputMeta } }: MicroPostListProps) {

  const { posts, meta, setModel } = useFluxStore(useShallow((store: FluxStore) => ({
    posts: store.model.posts,
    meta: store.model.meta,
    setModel: store.setModel
  })))

  useEffect(() => {
    (async () => {
      setModel({ posts: inputData, meta: inputMeta })
    })()
  }, [inputData, inputMeta, setModel])

  return (
    <>
      <section className={styles.container}>
        {posts.map((post: Partial<MicroPost>, index: number) => {
          return (
            <div key={index} className={styles.post}>
              <div className={styles.infos}>
                <h2>{post.title}</h2>
              </div>
              <div className={styles.picture__container}> <Image
                src={post.picture?.src || ''}
                alt={post.picture?.name || ''}
                fill
                className={styles.picture__image}
              /></div>
              <Link href={`/tips/${post.slug}`} aria-label={post.title} className={styles.inset__link} />
            </div>
          )
        })}
      </section>
    </>
  )
}