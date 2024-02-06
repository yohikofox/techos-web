"use client";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import { useFluxStore } from "@infra/store/flux";
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
  const { posts } = useFluxStore(
    useShallow((store: FluxStore) => {
      return {
        posts: store.model?.posts,
      };
    })
  );

  useEffect(() => {
    if (inputData !== undefined) {
      useFluxStore.getState().setModel({
        posts: inputData,
        meta: inputMeta,
      });
    }
  }, [inputData, inputMeta]);

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
