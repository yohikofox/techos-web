'use client'

import Text from "@Admin/components/Text"

import { useState } from "react"
import styles from "./styles.module.scss"

export interface TagCacheProps {
  initialValue?: string
}

export default function Component({ initialValue }: any) {

  const onChange = (value: string) => {
    console.log(value)
  }

  const triggerRefresh = () => {

  }

  return (
    <>
      <section className={styles.container}>
        <h1>Refresh cache by tag</h1>
        <div>
          <Text name="tag-name" label="tag Name" theme={"primary"} onChange={onChange} onValidate={triggerRefresh} />
        </div>
      </section>
    </>
  )
}