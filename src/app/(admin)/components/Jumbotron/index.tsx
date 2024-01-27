import { PropsWithChildren } from "react";

import styles from "./styles.module.scss"

export interface JumbotronProps extends PropsWithChildren {
  title: string
}
export default function Jumbotron({ title, children }: JumbotronProps) {
  return (
    <>
      <section className={styles.container}>
        <h3>{title}</h3>
        {children}
      </section>
    </>
  )
}