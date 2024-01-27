'use client'

import Text, { TextClassName } from "@Admin/components/Text"
import { useState } from "react"

import { refreshTag } from "./cache.service"
import styles from "./styles.module.scss"

export interface TagCacheProps {
  initialValue?: string
  className?: TextClassName
}

export default function Component({ initialValue, className }: TagCacheProps) {

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
        <div>
          <Text className={className} name="tag-name" label="tag Name" initialValue={value} onChange={onChange} onValidate={triggerRefresh} />
        </div>
      </section>
    </>
  )
}