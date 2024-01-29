"use client";

import Button from "@Admin/components/Button";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";

import { onClick } from "./actions";
import styles from "./styles.module.scss";

export default function Component() {
  const items = Object.entries(RevalidateTagConstants);

  const triggerClick = async (value: string) => await onClick(value);

  return (
    <>
      <section className={styles.container}>
        {items.map(([key, value], index) => (
          <Button key={index} onClick={() => triggerClick(value)}>
            {key}
          </Button>
        ))}
      </section>
    </>
  );
}
