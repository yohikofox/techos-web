import TagCache from "./components/TagCache"
import CacheItemList from "./components/CacheItemList"
import styles from "./style.module.scss"
import TagList from "./components/TagList"

export default function Page() {
  const apiKey = process.env.CACHE_API_KEY

  return (
    <>
      <div className={styles.container}>
        <TagCache />
        <TagList />
        <CacheItemList apiKey={apiKey!} />
      </div>
    </>
  )
}