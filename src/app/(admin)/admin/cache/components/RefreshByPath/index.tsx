'use client'

import Text, { TextClassName } from "@Admin/components/Text"
import { useState } from "react";
import { refreshPath } from "../TagCache/cache.service";
import styles from "./styles.module.scss"

export interface PathRefreshProps {
  apiKey: string;
  initialValue?: string;
  className?: TextClassName;
}
export default function Component({ apiKey, initialValue, className }: PathRefreshProps) {

  const [value, setValue] = useState<string>(initialValue || "")

  const onChange = (value: string) => {
    setValue(value)
  }

  const triggerRefresh = async () => {
    value && await refreshPath(value)
  }


  return (
    <>
      <section className={styles.container}>
        <div>
          <Text className={className} name="tag-name" label="Path" initialValue={value} onChange={onChange} onValidate={triggerRefresh} />
        </div>
      </section>
    </>
  )
}