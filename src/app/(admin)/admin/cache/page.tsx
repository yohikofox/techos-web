import TagCache from "./components/TagCache"
import CacheItemList from "./components/CacheItemList"
import styles from "./style.module.scss"

export default function Page() {

  const apiKey = process.env.CACHE_API_KEY

  return (
    <>
      <div className={styles.container}>
        <TagCache />
        <CacheItemList apiKey={apiKey!} />
      </div>
    </>
  )
}