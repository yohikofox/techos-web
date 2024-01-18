'use client'

import Text from "@Admin/components/Text"

import { useState } from "react"
import styles from "./styles.module.scss"
import { refreshTag } from "./cache.service"

export interface TagCacheProps {
  initialValue?: string
}

export default function Component({ initialValue }: any) {

  const [value, setValue] = useState<string>(initialValue || "")

  const onChange = (value: string) => {
    setValue(value)
  }

  const triggerRefresh = async () => {
    value && await refreshTag(value)
  }

  return (
    <>
      <section className={styles.container}>
        <h1>Refresh cache by tag</h1>
        <div>
          <Text name="tag-name" label="tag Name" initialValue={value} onChange={onChange} onValidate={triggerRefresh} />
        </div>
      </section>
    </>
  )
}