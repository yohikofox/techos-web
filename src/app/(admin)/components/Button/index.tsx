import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export default function Component({ children }: PropsWithChildren<{}> & {}) {
  return (
    <button className={styles.container}>{children}</button>
  )
}