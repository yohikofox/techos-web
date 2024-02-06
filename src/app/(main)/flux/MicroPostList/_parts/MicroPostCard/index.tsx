"use client";

import MicroPost from "@domain/microPost";
import classNames from "classnames";
import Link from "next/link";
import { Image } from "R/src/components/Image";

import styles from "./styles.module.scss";

export type PostClassNames = {
  container?: string;
  infos?: string;
  picture__container?: string;
  picture__image?: string;
};

export interface PostProps {
  post: Partial<MicroPost>;
  className?: PostClassNames;
}

export default function Component({ post, className }: PostProps) {
  return (
    <div className={classNames(styles.post, className?.container)}>
      <div className={classNames(styles.infos, className?.infos)}>
        <h2>{post.title}</h2>
      </div>
      <div
        className={classNames(
          styles.picture__container,
          className?.picture__container
        )}
      >
        {post.picture !== undefined && (
          <Image
            src={post.picture.src !== undefined ? post.picture.src : ""}
            alt={post.picture.name !== undefined ? post.picture.name : ""}
            fill
            className={classNames(
              styles.picture__image,
              className?.picture__image
            )}
          />
        )}
      </div>
      <Link
        href={`/tips/${post.slug}`}
        aria-label={post.title}
        className={styles.inset__link}
      />
    </div>
  );
}
