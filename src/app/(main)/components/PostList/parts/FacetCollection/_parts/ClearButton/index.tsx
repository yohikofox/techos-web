"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useCallback } from "react";

import styles from "./styles.module.scss";

export default function Component() {
  const router = useRouter();

  const clear: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault();
      router.push("/posts/1#facet-container");
    },
    [router]
  );

  return (
    <>
      <button className={styles.container} onClick={clear}>
        Effacer
      </button>
    </>
  );
}
