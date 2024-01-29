"use client";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import useFluxStore from "R/src/infrastructure/store/flux";
import { FluxStore } from "R/src/infrastructure/store/flux/_parts/flux/flux";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import MicroPostCard from "./_parts/MicroPostCard";
import styles from "./style.module.scss";

export interface MicroPostListProps {
  data: MicroPostList;
}

export default function Component({
  data: { posts: inputData, meta: inputMeta },
}: MicroPostListProps) {
  const { posts, setModel } = useFluxStore(
    useShallow((store: FluxStore) => ({
      posts: store.model.posts,
      setModel: store.setModel,
    }))
  );

  useEffect(() => {
    (async () => {
      setModel({ posts: inputData, meta: inputMeta });
    })();
  }, [inputData, inputMeta, setModel]);

  return (
    <>
      <section className={styles.container}>
        {posts.map((post: Partial<MicroPost>, index: number) => {
          return <MicroPostCard key={index} post={post} />;
        })}
      </section>
    </>
  );
}
