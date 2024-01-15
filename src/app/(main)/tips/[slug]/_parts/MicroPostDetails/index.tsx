import RenderMarkdown from "R/src/app/(main)/components/RenderMarkdown";
import MicroPost from "R/src/business/model/microPost";
import styles from "./styles.module.scss"

export interface MicroPostDetailsProps { data: MicroPost }
export default function Component({ data }: MicroPostDetailsProps) {
  return (
    <>
      <section className={styles.container}>
        <h1>{data.title}</h1>
        <RenderMarkdown content={data.content || ''} />
      </section>
    </>
  )
}