'use client';

import RevalidateTagConstants from "R/src/lib/constants/revalidateTag"
import styles from "./styles.module.scss"
import Button from "@Admin/components/Button"
import { onClick } from "./actions"

export default function Component() {
  const items = Object.entries(RevalidateTagConstants)

  return (
    <>
      <section className={styles.container}>
        {
          items.map(([key, value]) => (
            <div key={key}>
              <Button onClick={() => onClick(value)}>{key}</Button>
            </div>
          ))
        }
      </section>
    </>
  )
}