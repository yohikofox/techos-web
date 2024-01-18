'use client'

import Text from "@Admin/components/Text"
import { useState } from "react";
import { refreshPath } from "../TagCache/cache.service";
import styles from "./styles.module.scss"

export interface PathRefreshProps {
  apiKey: string;
  initialValue?: string;
}
//https://www.techos.dev/api/admin/cache/link?path=https://www.techos.dev/tag/server-side
export default function Component({ apiKey, initialValue }: PathRefreshProps) {

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
        <h1>Refresh cache path</h1>
        <div>
          <Text name="tag-name" label="Path" initialValue={value} onChange={onChange} onValidate={triggerRefresh} />
        </div>
      </section>
    </>
  )
}