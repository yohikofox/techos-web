import TagCache from "./components/TagCache"
import styles from "./style.module.scss"

export default function Page() {
  return (
    <>
      <div className={styles.container}>
        <TagCache />
      </div>
    </>
  )
}