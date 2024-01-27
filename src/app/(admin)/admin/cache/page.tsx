import Jumbotron from "@Admin/components/Jumbotron"

import RefreshByPath from "./components/RefreshByPath"
import TagCache from "./components/TagCache"
import TagList from "./components/TagList"
import styles from "./style.module.scss"

export default function Page() {
  const apiKey = process.env.CACHE_API_KEY

  return (
    <>
      <div className={styles.container}>
        <Jumbotron title="Tag Management">
          <TagCache className={{
            label: styles.label,
          }} />
          <TagList />
        </Jumbotron>
        <Jumbotron title="Path Management">
          <RefreshByPath
            className={{
              label: styles.label,
            }}
            apiKey={apiKey!} />
        </Jumbotron>
      </div>
    </>
  )
}