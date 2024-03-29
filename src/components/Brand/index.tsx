import classNames from 'classnames';

import { Artichoke } from "../Logo";
import styles from "./styles.module.scss";

export default function Brand({ className }: { className?: string }) {
  return (
    <>
      <span className={classNames(styles.container, className)}>
        <span className={styles.brand}>
          tech<Artichoke className={styles.logo} />
          s
        </span>
        <span className={styles.extension}><div>.dev</div></span>
      </span>
    </>
  )
}