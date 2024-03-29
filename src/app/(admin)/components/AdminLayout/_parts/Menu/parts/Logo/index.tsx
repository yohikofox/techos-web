'use client'
import Logo from "@Admin/components/Icon/Logo"
import classNames from "classnames"
import useAdminStore from "R/src/infrastructure/store/admin"

import styles from "./logo.module.scss"

export default function Component() {
  const isOpen = useAdminStore((state) => state.menu.isOpen)

  return (
    <div className={classNames(styles.container, {
      [styles.menu__opened]: isOpen
    })}>
      <div className={styles.icon}>
        <Logo className={styles.svg} />
      </div>
      <div className={styles.text}>
        <h1>techos.dev</h1>
        <h3>Backoffice</h3>
      </div>
    </div>
  )
}