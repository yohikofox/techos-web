'use client'

import useAdminStore from "R/src/infrastructure/store/admin"

import styles from "./styles.module.scss"

export default function Component() {
  const toggle = useAdminStore(state => state.profileMenu.toggle)

  function toggleClick(event: any): void {
    toggle()
  }
  return (
    <span onClick={toggleClick} data-name="profile-menu-toggle" className={styles.inset__link} />
  )
}