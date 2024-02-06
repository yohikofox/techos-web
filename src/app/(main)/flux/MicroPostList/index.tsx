"use client";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";

// import { useShallow } from "zustand/react/shallow";
import MicroPostCard from "./_parts/MicroPostCard";
import styles from "./style.module.scss";

export interface MicroPostListProps {
  data: MicroPostList;
}

export default function Component({
  data: { posts: inputData, meta: inputMeta },
}: MicroPostListProps) {
  console.debug("🚀 ~ inputMeta:", inputMeta);
  // const { posts } = useFluxStore({
  //   model: {
  //     posts: inputData,
  //     meta: inputMeta,
  //   },
  // })((store: FluxStore) => {
  //   return {
  //     posts: [],
  //     // posts: store.model?.posts,
  //   };
  // });

  const posts = inputData;

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
